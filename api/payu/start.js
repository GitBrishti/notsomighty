import { randomBytes } from 'node:crypto'
import { availableProducts } from '../../config/catalog.js'
import { paymentEndpoint, requestHash, merchantConfig } from '../../lib/payu.js'
import { sqlClient } from '../../lib/db.js'
import { json, errorJson, originAllowed, textField } from '../../lib/http.js'

export async function POST(request) {
  try {
    const config = merchantConfig()
    if (!originAllowed(request, config.siteUrl)) return errorJson('Origin not allowed', 403)
    if (Number(request.headers.get('content-length') || 0) > 8192) return errorJson('Request too large', 413)
    const body = await request.json()
    const sku = textField(body?.sku, 50)
    const qty = Number(body?.quantity)
    const firstname = textField(body?.firstName, 60)
    const email = textField(body?.email, 100)
    const phone = textField(body?.phone, 15)
    const address = textField(body?.address, 200)
    const city = textField(body?.city, 70)
    const state = textField(body?.state, 70)
    const pincode = textField(body?.pincode, 6)

    if (!Number.isInteger(qty) || qty < 1 || qty > 5 || !firstname || !address || !city || !state ||
        !/^\d{6}$/.test(pincode) || !/^[6-9]\d{9}$/.test(phone) ||
        !/^[^\s@|]+@[^\s@|]+\.[^\s@|]+$/.test(email)) {
      return errorJson('Please check your contact and delivery information')
    }

    const product = availableProducts(config.mode).find((p) => p.id === sku)
    if (!product) return errorJson('This item is not available for checkout', 400)

    // Prices are set by server-owned catalog, never from the request.
    const amountPaise = product.pricePaise * qty
    if (!Number.isSafeInteger(amountPaise) || amountPaise > 20000000) return errorJson('Invalid order total', 400)
    const amount = (amountPaise / 100).toFixed(2)
    const txnid = `NSM${new Date().toISOString().slice(2, 10).replaceAll('-', '')}${randomBytes(7).toString('hex')}`
    const productinfo = `NotSoMighty order ${txnid}`
    const callback = `${config.siteUrl}/api/payu/return`
    const fields = {
      key: config.key, txnid, amount, productinfo, firstname, email, phone,
      address1: address, city, state, zipcode: pincode, country: 'India',
      surl: callback, furl: callback,
    }
    fields.hash = requestHash(fields, config.salt)

    const sql = sqlClient()
    await sql`INSERT INTO payu_orders (
       txnid, amount_paise, currency, productinfo, firstname, email, phone,
       shipping_address, items, status
    ) VALUES (
       ${txnid}, ${amountPaise}, 'INR', ${productinfo}, ${firstname}, ${email}, ${phone},
       ${JSON.stringify({ address, city, state, pincode })}::jsonb,
       ${JSON.stringify([{ sku, name: product.name, pricePaise: product.pricePaise, quantity: qty }])}::jsonb,
       'pending'
    )`

    return json({ gatewayUrl: paymentEndpoint(config.mode), fields, orderId: txnid })
  } catch (error) {
    console.error('PayU checkout init failed:', error?.message)
    return errorJson('Checkout is temporarily unavailable. Please try again later.', 503)
  }
}

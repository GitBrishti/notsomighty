import { getOrder, claimStatusCheck, setPaymentStatus } from '../../lib/db.js'
import { merchantConfig, verifyWithPayU, paymentMatchesOrder, positiveAmountToPaise } from '../../lib/payu.js'
import { json, errorJson } from '../../lib/http.js'

export async function GET(request) {
  try {
    const id = new URL(request.url).searchParams.get('orderId') ?? ''
    if (!/^NSM\d{6}[a-f0-9]{14}$/.test(id)) return errorJson('Invalid order reference')
    const order = await getOrder(id)
    if (!order) return errorJson('Order not found', 404)

    // If a callback did not arrive or PayU status was delayed, poll PayU securely.
    // The database enforces a 30-second interval between checks for this order.
    if (order.status === 'pending' && await claimStatusCheck(id)) {
      try {
        const config = merchantConfig()
        const verified = await verifyWithPayU(config, id)
        if (verified && paymentMatchesOrder(verified, order)) {
          await setPaymentStatus(id, 'paid', String(verified.mihpayid))
        } else if (verified && ['failure', 'failed'].includes(String(verified.status).toLowerCase()) &&
            positiveAmountToPaise(verified.transaction_amount ?? verified.amt) === Number(order.amount_paise)) {
          await setPaymentStatus(id, 'failed', verified.mihpayid ? String(verified.mihpayid) : null)
        }
      } catch (e) {
        console.warn('PayU status recheck delayed:', e?.message)
      }
    }

    const latest = await getOrder(id)
    return json({ orderId: latest.txnid, amountPaise: Number(latest.amount_paise),
      currency: latest.currency, status: latest.status })
  } catch (error) {
    console.error('Order status lookup failed:', error?.message)
    return errorJson('Order status is unavailable', 503)
  }
}

import { useEffect, useState } from 'react'
import { ArrowUpRight, ShoppingBag } from 'lucide-react'

const rupees = (paise) => (Number(paise) / 100).toLocaleString('en-IN', {
  style: 'currency', currency: 'INR', minimumFractionDigits: 2,
})

const initialCustomer = {
  firstName: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
}

export default function PayUCheckout() {
  const [catalog, setCatalog] = useState(null)
  const [chosenSku, setChosenSku] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [customer, setCustomer] = useState(initialCustomer)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [receipt, setReceipt] = useState(null)
  const [receiptBusy, setReceiptBusy] = useState(false)
  const params = new URLSearchParams(window.location.search)
  const returnedOrderId = params.get('orderId')
  const returnedPayment = params.get('payment')

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/payu/catalog', { signal: controller.signal, cache: 'no-store' })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data?.error || 'Could not load checkout')
        return data
      })
      .then((data) => {
        setCatalog(data)
        setChosenSku(data.products[0]?.id || '')
      })
      .catch((err) => { if (err.name !== 'AbortError') setError('Checkout is not configured yet. Use Vercel Dev locally or check your Vercel settings.') })
    return () => controller.abort()
  }, [])

  async function checkOrderStatus() {
    if (!/^NSM\d{6}[a-f0-9]{14}$/.test(returnedOrderId || '')) return
    setReceiptBusy(true)
    try {
      const response = await fetch(`/api/payu/status?orderId=${encodeURIComponent(returnedOrderId)}`, { cache: 'no-store' })
      if (!response.ok) throw new Error('Could not check order status')
      setReceipt(await response.json())
    } catch {
      setReceipt({ status: 'unknown', orderId: returnedOrderId })
    } finally {
      setReceiptBusy(false)
    }
  }

  useEffect(() => {
    if (returnedOrderId) checkOrderStatus()
    // Payment query is taken once when the page loads after PayU redirects.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnedOrderId])

  const selected = catalog?.products.find((product) => product.id === chosenSku)
  const total = selected ? selected.pricePaise * quantity : 0

  function changeCustomer(key, value) {
    setCustomer((previous) => ({ ...previous, [key]: value }))
  }

  async function beginPayment(event) {
    event.preventDefault()
    if (!chosenSku || busy) return
    setBusy(true)
    setError('')
    try {
      const response = await fetch('/api/payu/start', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sku: chosenSku, quantity, ...customer }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Unable to begin payment')
      // Only send the form to PayU's official hosted checkout origins.
      if (!['https://test.payu.in/_payment', 'https://secure.payu.in/_payment'].includes(payload.gatewayUrl)) {
        throw new Error('Unexpected payment destination')
      }
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = payload.gatewayUrl
      form.style.display = 'none'
      for (const [name, value] of Object.entries(payload.fields)) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = String(value)
        form.appendChild(input)
      }
      document.body.appendChild(form)
      form.submit()
    } catch (err) {
      setError(err?.message || 'Checkout failed. Please retry.')
      setBusy(false)
    }
  }

  const paid = receipt?.status === 'paid'
  const failed = receipt?.status === 'failed'

  return (
    <section className="payu-area" id="checkout" aria-labelledby="payu-heading">
      <div className="payu-header">
        <span className="eyebrow">A LITTLE ART, A LITTLE JOY</span>
        <h2 id="payu-heading">Your bag, <em>your way.</em></h2>
        <p>Pick an artwork, fill in your details, and pay securely on PayU.</p>
      </div>

      {returnedPayment === 'unverified' && (
        <div className="payu-status" role="alert">
          We couldn't validate that PayU response. No payment has been marked successful. If money was debited, contact the store with your PayU transaction reference.
        </div>
      )}

      {returnedOrderId && (
        <div className={`payu-status ${paid ? 'is-paid' : ''}`} role="status">
          <strong>{receiptBusy ? 'Checking with our server…' : paid ? 'Payment verified ✓' : failed ? 'Payment not completed' : 'Payment verification pending'}</strong>
          <p>{paid
            ? 'PayU confirmed your transaction. Keep your order reference for your records.'
            : failed ? 'The transaction failed. You can try again with a new checkout.'
            : 'Do not pay twice while a transaction is being verified. Check your PayU receipt and try refreshing this status.'}</p>
          <small>Order reference: {returnedOrderId}</small>
          {receipt?.status !== 'paid' && <button className="payu-refresh" type="button" disabled={receiptBusy} onClick={checkOrderStatus}>Refresh payment status</button>}
        </div>
      )}

      {!catalog && <p className="payu-loading">Loading checkout options…</p>}
      {catalog && catalog.products.length === 0 && (
        <div className="payu-not-ready">The payment gateway is prepared, but no priced artworks have been published yet. Check back when the shop opens! ✳</div>
      )}
      {catalog && catalog.products.length > 0 && (
        <form className="payu-checkout" onSubmit={beginPayment}>
          <div className="payu-items">
            <span className="payu-stage">01 / THE ART</span>
            <h3>Pick your happy ✳</h3>
            {catalog.mode === 'test' && <p className="payu-test-notice">SANDBOX MODE — simulated payments only. No real merchandise is sold here.</p>}
            <label htmlFor="payu-product">Artwork</label>
            <select id="payu-product" required value={chosenSku} onChange={(e) => setChosenSku(e.target.value)}>
              {catalog.products.map((item) => <option key={item.id} value={item.id}>{item.name} — {rupees(item.pricePaise)}</option>)}
            </select>
            <label htmlFor="payu-quantity">Quantity</label>
            <select id="payu-quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
              {[1,2,3,4,5].map((qty) => <option key={qty} value={qty}>{qty}</option>)}
            </select>
            <div className="payu-subtotal">
              <span>Total <small>(INR)</small></span>
              <strong>{rupees(total)}</strong>
            </div>
            <p className="payu-fine-print">Final product prices must include any applicable tax and delivery charges before enabling live checkout.</p>
          </div>

          <div className="payu-customer">
            <span className="payu-stage">02 / YOUR DETAILS</span>
            <h3>Almost yours ☻</h3>
            <label htmlFor="payu-firstname">First name</label>
            <input id="payu-firstname" autoComplete="given-name" required maxLength={60} value={customer.firstName} onChange={(e) => changeCustomer('firstName', e.target.value)} />
            <div className="payu-fields-row">
              <div><label htmlFor="payu-email">Email</label><input id="payu-email" type="email" required autoComplete="email" maxLength={100} value={customer.email} onChange={(e) => changeCustomer('email', e.target.value)} /></div>
              <div><label htmlFor="payu-phone">Mobile number</label><input id="payu-phone" type="tel" inputMode="numeric" autoComplete="tel" required pattern="[6-9][0-9]{9}" title="10-digit Indian mobile number" value={customer.phone} onChange={(e) => changeCustomer('phone', e.target.value)} /></div>
            </div>
            <label htmlFor="payu-address">Delivery address</label>
            <input id="payu-address" autoComplete="street-address" required maxLength={200} value={customer.address} onChange={(e) => changeCustomer('address', e.target.value)} />
            <div className="payu-fields-row">
              <div><label htmlFor="payu-city">City</label><input id="payu-city" required maxLength={70} autoComplete="address-level2" value={customer.city} onChange={(e) => changeCustomer('city', e.target.value)} /></div>
              <div><label htmlFor="payu-state">State</label><input id="payu-state" required maxLength={70} autoComplete="address-level1" value={customer.state} onChange={(e) => changeCustomer('state', e.target.value)} /></div>
            </div>
            <label htmlFor="payu-pincode">PIN code</label>
            <input id="payu-pincode" type="text" inputMode="numeric" autoComplete="postal-code" required pattern="[0-9]{6}" maxLength={6} value={customer.pincode} onChange={(e) => changeCustomer('pincode', e.target.value)} />
            <button className="payu-pay-button" type="submit" disabled={busy || !selected}>
              <ShoppingBag size={20} strokeWidth={2.5}/>
              {busy ? 'Connecting to PayU…' : `Pay ${rupees(total)} with PayU`}
              <ArrowUpRight size={20}/>
            </button>
            <small className="payu-security">Payments are processed by PayU. We never ask for card numbers on this website.</small>
            {error && <p className="payu-error" role="alert">{error}</p>}
          </div>
        </form>
      )}
      {!catalog && error && <p className="payu-error" role="alert">{error}</p>}
    </section>
  )
}

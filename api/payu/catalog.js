import { availableProducts } from '../../config/catalog.js'
import { json, errorJson } from '../../lib/http.js'

export function GET() {
  const mode = process.env.PAYU_MODE
  if (!['test', 'live'].includes(mode)) return errorJson('Checkout is not configured yet', 503)
  const products = availableProducts(mode).map(({ id, name, pricePaise }) => ({ id, name, pricePaise }))
  return json({ products, mode })
}

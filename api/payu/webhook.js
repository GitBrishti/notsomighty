import { processCallback } from '../../lib/callback.js'
import { json, errorJson } from '../../lib/http.js'

export async function POST(request) {
  try {
    const result = await processCallback(request)
    return json({ received: true, orderId: result.orderId, status: result.status })
  } catch (error) {
    console.error('PayU webhook validation failed:', error?.message)
    return errorJson('Invalid callback', 400)
  }
}

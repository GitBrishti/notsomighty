import { processCallback } from '../../lib/callback.js'

export async function POST(request) {
  try {
    const result = await processCallback(request)
    const base = process.env.SITE_URL
    const url = new URL(base)
    url.searchParams.set('orderId', result.orderId)
    url.searchParams.set('payment', result.status)
    url.hash = 'checkout'
    return Response.redirect(url, 303)
  } catch (error) {
    // Never trust unsigned/mismatching callbacks or display their raw contents.
    console.error('PayU return validation failed:', error?.message)
    const base = new URL(process.env.SITE_URL)
    base.searchParams.set('payment', 'unverified')
    base.hash = 'checkout'
    return Response.redirect(base, 303)
  }
}

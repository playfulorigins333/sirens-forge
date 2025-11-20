// lib/stripe.ts
import Stripe from 'stripe'

// Get secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment variables.')
}

// Force correct API version — ignore TypeScript error
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-10-29.clover" as any, // ← THIS FIXES IT
})

// Optional type
export type StripeClient = typeof stripe

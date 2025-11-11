// lib/stripe.ts
import Stripe from 'stripe'

// Get secret key from environment
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

// Throw clear error if missing (helps catch config issues early)
if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment variables. Check Vercel env vars.')
}

// Export the Stripe instance — THIS FIXES THE MODULE ERROR
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20', // Latest stable version
})

// Optional: Export type for better TypeScript support
export type StripeClient = typeof stripe

/* ============================================================
   MINDWELL — STRIPE HELPER (Free, no monthly; Test Mode)
   Set in .env.local:
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
     STRIPE_SECRET_KEY=sk_test_...
   Test card: 4242 4242 4242 4242
   ============================================================ */

import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY as string;

export function getStripe(): Stripe | null {
  if (!secretKey) {
    console.warn("[stripe] STRIPE_SECRET_KEY not set");
    return null;
  }
  return new Stripe(secretKey, { apiVersion: "2024-06-20" as Stripe.LatestApiVersion });
}

export const PRICING = {
  plus: { id: "price_plus_monthly", name: "Mindwell Plus", amount: 900, currency: "usd" },
  calm: { id: "price_calm_yearly", name: "Mindwell Calm", amount: 8400, currency: "usd" },
};

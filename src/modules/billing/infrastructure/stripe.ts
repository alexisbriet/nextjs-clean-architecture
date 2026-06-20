import Stripe from "stripe";
import { env } from "@/config/env";

let stripe: Stripe | null = null;

export function getStripe() {
  if (!env.stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is required to use Stripe.");
  }

  stripe ??= new Stripe(env.stripeSecretKey);

  return stripe;
}

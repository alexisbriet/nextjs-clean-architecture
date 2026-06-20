"use server";

import { redirect } from "next/navigation";
import { env } from "@/config/env";
import { requireAppSession } from "@/infrastructure/auth/session";
import { createBillingPortalSessionUseCase } from "../application/use-cases/create-billing-portal-session.use-case";
import { createCheckoutSessionUseCase } from "../application/use-cases/create-checkout-session.use-case";
import { prismaBillingRepository } from "../infrastructure/prisma-billing.repository";
import { stripePaymentProvider } from "../infrastructure/stripe-payment.provider";

export async function createCheckoutSessionAction() {
  if (!env.stripeProPriceId) {
    throw new Error("STRIPE_PRO_PRICE_ID is required to create Checkout.");
  }

  const session = await requireAppSession();
  const url = await createCheckoutSessionUseCase({
    workspaceId: session.workspaceId,
    priceId: env.stripeProPriceId,
    successUrl: `${env.appUrl}/dashboard/billing?checkout=success`,
    cancelUrl: `${env.appUrl}/dashboard/billing?checkout=cancelled`,
    billingRepository: prismaBillingRepository,
    paymentProvider: stripePaymentProvider,
  });

  redirect(url);
}

export async function createBillingPortalSessionAction() {
  const session = await requireAppSession();
  const url = await createBillingPortalSessionUseCase({
    workspaceId: session.workspaceId,
    returnUrl: `${env.appUrl}/dashboard/billing`,
    billingRepository: prismaBillingRepository,
    paymentProvider: stripePaymentProvider,
  });

  redirect(url);
}

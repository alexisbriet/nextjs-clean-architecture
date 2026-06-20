import { headers } from "next/headers";
import type Stripe from "stripe";
import { env } from "@/config/env";
import { prismaBillingRepository } from "@/modules/billing/infrastructure/prisma-billing.repository";
import { getStripe } from "@/modules/billing/infrastructure/stripe";
import {
  getStripeObjectId,
  mapStripeSubscription,
} from "@/modules/billing/infrastructure/stripe-webhook.mapper";

export async function POST(request: Request) {
  if (!env.stripeWebhookSecret) {
    return Response.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured." },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      env.stripeWebhookSecret,
    );
  } catch {
    return Response.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  const shouldProcess = await prismaBillingRepository.recordStripeEvent({
    id: event.id,
    type: event.type,
  });

  if (!shouldProcess) {
    return Response.json({ received: true, duplicate: true });
  }

  await handleStripeEvent(event);

  return Response.json({ received: true });
}

async function handleStripeEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object);
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await handleSubscriptionSynced(event.data.object);
      break;
    default:
      break;
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription") {
    return;
  }

  const workspaceId =
    session.metadata?.workspaceId ?? session.client_reference_id ?? undefined;
  const customerId = getStripeObjectId(session.customer);
  const subscriptionId = getStripeObjectId(session.subscription);

  if (!workspaceId || !customerId || !subscriptionId) {
    return;
  }

  await prismaBillingRepository.setStripeCustomerId({
    workspaceId,
    customerId,
  });

  const subscription = await getStripe().subscriptions.retrieve(subscriptionId);

  await prismaBillingRepository.syncSubscription(
    mapStripeSubscription({ subscription, workspaceId }),
  );
}

async function handleSubscriptionSynced(subscription: Stripe.Subscription) {
  const customerId = getStripeObjectId(subscription.customer);

  if (!customerId) {
    return;
  }

  const workspaceId =
    subscription.metadata.workspaceId ??
    (await prismaBillingRepository.findWorkspaceIdByStripeCustomerId(customerId));

  if (!workspaceId) {
    return;
  }

  await prismaBillingRepository.syncSubscription(
    mapStripeSubscription({ subscription, workspaceId }),
  );
}

import type Stripe from "stripe";
import type { SyncedSubscription } from "../domain/billing.entity";

export function getStripeObjectId(value: string | { id: string } | null) {
  return typeof value === "string" ? value : value?.id;
}

export function mapStripeSubscription(input: {
  subscription: Stripe.Subscription;
  workspaceId: string;
}): SyncedSubscription {
  const item = input.subscription.items.data[0];

  return {
    workspaceId: input.workspaceId,
    providerCustomerId: getStripeObjectId(input.subscription.customer) ?? "",
    providerSubscriptionId: input.subscription.id,
    providerPriceId: item?.price.id,
    status: input.subscription.status.toUpperCase() as SyncedSubscription["status"],
    currentPeriodEnd: item?.current_period_end
      ? new Date(item.current_period_end * 1000)
      : undefined,
    cancelAtPeriodEnd: input.subscription.cancel_at_period_end,
  };
}

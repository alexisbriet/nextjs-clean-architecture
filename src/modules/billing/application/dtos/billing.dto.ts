import type { BillingProfile } from "../../domain/billing.entity";

export type BillingProfileDto = {
  workspaceId: string;
  plan: BillingProfile["plan"];
  stripeCustomerId: string | null;
  subscription:
    | {
        status: string;
        providerPriceId: string | null;
        currentPeriodEnd: string | null;
        cancelAtPeriodEnd: boolean;
      }
    | null;
};

export function toBillingProfileDto(profile: BillingProfile): BillingProfileDto {
  return {
    workspaceId: profile.workspaceId,
    plan: profile.plan,
    stripeCustomerId: profile.stripeCustomerId,
    subscription: profile.subscription
      ? {
          status: profile.subscription.status,
          providerPriceId: profile.subscription.providerPriceId,
          currentPeriodEnd:
            profile.subscription.currentPeriodEnd?.toISOString() ?? null,
          cancelAtPeriodEnd: profile.subscription.cancelAtPeriodEnd,
        }
      : null,
  };
}

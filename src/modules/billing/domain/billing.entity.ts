export type SubscriptionStatus =
  | "INCOMPLETE"
  | "INCOMPLETE_EXPIRED"
  | "TRIALING"
  | "ACTIVE"
  | "PAST_DUE"
  | "CANCELED"
  | "UNPAID"
  | "PAUSED";

export type BillingProfile = {
  workspaceId: string;
  plan: "FREE" | "PRO" | "ENTERPRISE";
  stripeCustomerId: string | null;
  subscription:
    | {
        status: SubscriptionStatus;
        providerPriceId: string | null;
        currentPeriodEnd: Date | null;
        cancelAtPeriodEnd: boolean;
      }
    | null;
};

export type SyncedSubscription = {
  workspaceId: string;
  providerCustomerId: string;
  providerSubscriptionId: string;
  providerPriceId?: string;
  status: SubscriptionStatus;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
};

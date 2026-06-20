import type { BillingProfile, SyncedSubscription } from "./billing.entity";

export interface BillingRepository {
  getBillingProfile(workspaceId: string): Promise<BillingProfile | null>;
  findWorkspaceIdByStripeCustomerId(customerId: string): Promise<string | null>;
  setStripeCustomerId(input: {
    workspaceId: string;
    customerId: string;
  }): Promise<void>;
  syncSubscription(subscription: SyncedSubscription): Promise<void>;
  recordStripeEvent(input: { id: string; type: string }): Promise<boolean>;
}

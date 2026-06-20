export type CheckoutSessionInput = {
  workspaceId: string;
  customerId?: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
};

export type CheckoutSessionResult = {
  customerId?: string;
  url: string;
};

export type BillingPortalInput = {
  customerId: string;
  returnUrl: string;
};

export type BillingPortalResult = {
  url: string;
};

export interface PaymentProvider {
  createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSessionResult>;
  createBillingPortalSession(input: BillingPortalInput): Promise<BillingPortalResult>;
}

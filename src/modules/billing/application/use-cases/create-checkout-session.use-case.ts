import type { BillingRepository } from "../../domain/billing.repository";
import type { PaymentProvider } from "../../domain/payment-provider";

type Input = {
  workspaceId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  billingRepository: BillingRepository;
  paymentProvider: PaymentProvider;
};

export async function createCheckoutSessionUseCase(input: Input) {
  const profile = await input.billingRepository.getBillingProfile(
    input.workspaceId,
  );

  if (!profile) {
    throw new Error("Workspace introuvable.");
  }

  const session = await input.paymentProvider.createCheckoutSession({
    workspaceId: input.workspaceId,
    customerId: profile.stripeCustomerId ?? undefined,
    priceId: input.priceId,
    successUrl: input.successUrl,
    cancelUrl: input.cancelUrl,
  });

  if (session.customerId && session.customerId !== profile.stripeCustomerId) {
    await input.billingRepository.setStripeCustomerId({
      workspaceId: input.workspaceId,
      customerId: session.customerId,
    });
  }

  return session.url;
}

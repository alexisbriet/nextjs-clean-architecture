import type { BillingRepository } from "../../domain/billing.repository";
import type { PaymentProvider } from "../../domain/payment-provider";

type Input = {
  workspaceId: string;
  returnUrl: string;
  billingRepository: BillingRepository;
  paymentProvider: PaymentProvider;
};

export async function createBillingPortalSessionUseCase(input: Input) {
  const profile = await input.billingRepository.getBillingProfile(
    input.workspaceId,
  );

  if (!profile?.stripeCustomerId) {
    throw new Error("Aucun client Stripe associe a ce workspace.");
  }

  const session = await input.paymentProvider.createBillingPortalSession({
    customerId: profile.stripeCustomerId,
    returnUrl: input.returnUrl,
  });

  return session.url;
}

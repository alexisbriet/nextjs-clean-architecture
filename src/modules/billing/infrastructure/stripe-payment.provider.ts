import { getStripe } from "./stripe";
import type { PaymentProvider } from "../domain/payment-provider";

export const stripePaymentProvider: PaymentProvider = {
  async createCheckoutSession(input) {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create(
      {
        mode: "subscription",
        customer: input.customerId,
        line_items: [
          {
            price: input.priceId,
            quantity: 1,
          },
        ],
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        client_reference_id: input.workspaceId,
        metadata: {
          workspaceId: input.workspaceId,
        },
        subscription_data: {
          metadata: {
            workspaceId: input.workspaceId,
          },
        },
      },
      {
        idempotencyKey: `checkout:${input.workspaceId}:${input.priceId}`,
      },
    );

    if (!session.url) {
      throw new Error("Stripe n'a pas retourne d'URL Checkout.");
    }

    return {
      customerId:
        typeof session.customer === "string" ? session.customer : undefined,
      url: session.url,
    };
  },

  async createBillingPortalSession(input) {
    const stripe = getStripe();
    const session = await stripe.billingPortal.sessions.create({
      customer: input.customerId,
      return_url: input.returnUrl,
    });

    return { url: session.url };
  },
};

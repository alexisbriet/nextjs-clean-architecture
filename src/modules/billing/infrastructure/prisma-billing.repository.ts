import { prisma } from "@/infrastructure/database/prisma";
import type { BillingRepository } from "../domain/billing.repository";

export const prismaBillingRepository: BillingRepository = {
  async getBillingProfile(workspaceId) {
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      select: {
        id: true,
        plan: true,
        stripeCustomerId: true,
        subscription: {
          select: {
            status: true,
            providerPriceId: true,
            currentPeriodEnd: true,
            cancelAtPeriodEnd: true,
          },
        },
      },
    });

    if (!workspace) {
      return null;
    }

    return {
      workspaceId: workspace.id,
      plan: workspace.plan,
      stripeCustomerId: workspace.stripeCustomerId,
      subscription: workspace.subscription,
    };
  },

  async findWorkspaceIdByStripeCustomerId(customerId) {
    const workspace = await prisma.workspace.findUnique({
      where: { stripeCustomerId: customerId },
      select: { id: true },
    });

    return workspace?.id ?? null;
  },

  async setStripeCustomerId(input) {
    await prisma.workspace.update({
      where: { id: input.workspaceId },
      data: { stripeCustomerId: input.customerId },
    });
  },

  async syncSubscription(subscription) {
    await prisma.subscription.upsert({
      where: {
        providerSubscriptionId: subscription.providerSubscriptionId,
      },
      create: {
        workspaceId: subscription.workspaceId,
        providerCustomerId: subscription.providerCustomerId,
        providerSubscriptionId: subscription.providerSubscriptionId,
        providerPriceId: subscription.providerPriceId,
        status: subscription.status,
        currentPeriodEnd: subscription.currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      },
      update: {
        providerCustomerId: subscription.providerCustomerId,
        providerPriceId: subscription.providerPriceId,
        status: subscription.status,
        currentPeriodEnd: subscription.currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      },
    });
  },

  async recordStripeEvent(input) {
    try {
      await prisma.stripeEvent.create({
        data: {
          id: input.id,
          type: input.type,
        },
      });

      return true;
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002"
      ) {
        return false;
      }

      throw error;
    }
  },
};

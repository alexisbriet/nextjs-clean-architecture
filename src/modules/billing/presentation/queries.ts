import { requireAppSession } from "@/infrastructure/auth/session";
import { getBillingProfileUseCase } from "../application/use-cases/get-billing-profile.use-case";
import { prismaBillingRepository } from "../infrastructure/prisma-billing.repository";

export async function getBillingProfileForCurrentWorkspace() {
  const session = await requireAppSession();

  return getBillingProfileUseCase({
    workspaceId: session.workspaceId,
    billingRepository: prismaBillingRepository,
  });
}

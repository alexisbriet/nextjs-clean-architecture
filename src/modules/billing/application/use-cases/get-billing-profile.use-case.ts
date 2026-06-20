import type { BillingRepository } from "../../domain/billing.repository";
import { toBillingProfileDto } from "../dtos/billing.dto";

type Input = {
  workspaceId: string;
  billingRepository: BillingRepository;
};

export async function getBillingProfileUseCase(input: Input) {
  const profile = await input.billingRepository.getBillingProfile(
    input.workspaceId,
  );

  return profile ? toBillingProfileDto(profile) : null;
}

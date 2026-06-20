import { DomainError } from "@/shared/domain/errors";

export const PROJECT_LIMITS_BY_PLAN = {
  FREE: 5,
  PRO: 100,
  ENTERPRISE: Number.POSITIVE_INFINITY,
} as const;

export type ProjectPlan = keyof typeof PROJECT_LIMITS_BY_PLAN;

export function assertCanCreateProject(input: {
  currentProjectCount: number;
  plan: ProjectPlan;
}) {
  const limit = PROJECT_LIMITS_BY_PLAN[input.plan];

  if (input.currentProjectCount >= limit) {
    throw new DomainError("Limite de projets atteinte pour ce plan.");
  }
}

export function normalizeProjectName(name: string) {
  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    throw new DomainError("Le nom du projet doit contenir au moins 2 caracteres.");
  }

  if (trimmedName.length > 80) {
    throw new DomainError("Le nom du projet ne peut pas depasser 80 caracteres.");
  }

  return trimmedName;
}

export function createProjectSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

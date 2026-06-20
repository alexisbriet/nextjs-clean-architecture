import type { ProjectRepository } from "../../domain/project.repository";
import {
  assertCanCreateProject,
  createProjectSlug,
  normalizeProjectName,
} from "../../domain/project.rules";
import { toProjectDto } from "../dtos/project.dto";

type Input = {
  workspaceId: string;
  ownerId: string;
  name: string;
  projectRepository: ProjectRepository;
};

export async function createProjectUseCase(input: Input) {
  const policy = await input.projectRepository.getWorkspacePolicy(input.workspaceId);

  if (!policy) {
    throw new Error("Workspace introuvable.");
  }

  assertCanCreateProject({
    currentProjectCount: policy.projectCount,
    plan: policy.plan,
  });

  const name = normalizeProjectName(input.name);
  const project = await input.projectRepository.create({
    workspaceId: input.workspaceId,
    ownerId: input.ownerId,
    name,
    slug: createProjectSlug(name),
  });

  return toProjectDto(project);
}

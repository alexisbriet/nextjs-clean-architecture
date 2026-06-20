import { requireAppSession } from "@/infrastructure/auth/session";
import { listProjectsUseCase } from "../application/use-cases/list-projects.use-case";
import { prismaProjectRepository } from "../infrastructure/prisma-project.repository";

export async function getProjectsForCurrentWorkspace() {
  const session = await requireAppSession();

  return listProjectsUseCase({
    workspaceId: session.workspaceId,
    projectRepository: prismaProjectRepository,
  });
}

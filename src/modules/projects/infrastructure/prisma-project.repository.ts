import { prisma } from "@/infrastructure/database/prisma";
import type { ProjectRepository } from "../domain/project.repository";

export const prismaProjectRepository: ProjectRepository = {
  async getWorkspacePolicy(workspaceId) {
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      select: {
        plan: true,
        _count: {
          select: { projects: true },
        },
      },
    });

    if (!workspace) {
      return null;
    }

    return {
      plan: workspace.plan,
      projectCount: workspace._count.projects,
    };
  },

  findManyByWorkspaceId(workspaceId) {
    return prisma.project.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });
  },

  create(data) {
    return prisma.project.create({ data });
  },
};

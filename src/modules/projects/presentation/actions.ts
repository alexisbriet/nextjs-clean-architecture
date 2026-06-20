"use server";

import { revalidatePath } from "next/cache";
import { requireAppSession } from "@/infrastructure/auth/session";
import { createProjectUseCase } from "../application/use-cases/create-project.use-case";
import { prismaProjectRepository } from "../infrastructure/prisma-project.repository";

export async function createProjectAction(formData: FormData) {
  const session = await requireAppSession();

  await createProjectUseCase({
    workspaceId: session.workspaceId,
    ownerId: session.userId,
    name: String(formData.get("name") ?? ""),
    projectRepository: prismaProjectRepository,
  });

  revalidatePath("/dashboard/projects");
}

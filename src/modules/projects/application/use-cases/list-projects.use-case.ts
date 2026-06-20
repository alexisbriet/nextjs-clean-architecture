import type { ProjectRepository } from "../../domain/project.repository";
import { toProjectDto } from "../dtos/project.dto";

type Input = {
  workspaceId: string;
  projectRepository: ProjectRepository;
};

export async function listProjectsUseCase(input: Input) {
  const projects = await input.projectRepository.findManyByWorkspaceId(
    input.workspaceId,
  );

  return projects.map(toProjectDto);
}

import type { Project } from "../../domain/project.entity";

export type ProjectDto = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

export function toProjectDto(project: Project): ProjectDto {
  return {
    id: project.id,
    name: project.name,
    slug: project.slug,
    createdAt: project.createdAt.toISOString(),
  };
}

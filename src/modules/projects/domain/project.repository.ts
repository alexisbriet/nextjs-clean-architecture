import type { NewProject, Project } from "./project.entity";
import type { ProjectPlan } from "./project.rules";

export type WorkspaceProjectPolicy = {
  plan: ProjectPlan;
  projectCount: number;
};

export interface ProjectRepository {
  getWorkspacePolicy(workspaceId: string): Promise<WorkspaceProjectPolicy | null>;
  findManyByWorkspaceId(workspaceId: string): Promise<Project[]>;
  create(data: NewProject): Promise<Project>;
}

export type Project = {
  id: string;
  workspaceId: string;
  ownerId: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NewProject = {
  workspaceId: string;
  ownerId: string;
  name: string;
  slug: string;
};

export type AppSession = {
  userId: string;
  workspaceId: string;
};

export async function requireAppSession(): Promise<AppSession> {
  return {
    userId: "demo-user",
    workspaceId: "demo-workspace",
  };
}

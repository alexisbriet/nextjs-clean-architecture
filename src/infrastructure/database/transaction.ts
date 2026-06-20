import { prisma } from "./prisma";

export async function transaction<T>(
  callback: Parameters<typeof prisma.$transaction>[0],
): Promise<T> {
  return prisma.$transaction(callback) as Promise<T>;
}

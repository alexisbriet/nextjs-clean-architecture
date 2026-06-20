import type { CategorieRepository } from "../domain/categorie.repository";

export const prismaCategorieRepository: CategorieRepository = {
  findMany() {
    throw new Error("Implement prismaCategorieRepository.findMany after adding the Prisma model.");
  },

  create() {
    throw new Error("Implement prismaCategorieRepository.create after adding the Prisma model.");
  },
};

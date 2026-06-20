import { listCategorieUseCase } from "../application/use-cases/list-categorie.use-case";
import { prismaCategorieRepository } from "../infrastructure/prisma-categorie.repository";

export async function getCategorie() {
  return listCategorieUseCase({
    categorieRepository: prismaCategorieRepository,
  });
}

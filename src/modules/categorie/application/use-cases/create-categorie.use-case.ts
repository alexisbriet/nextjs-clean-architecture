import type { CategorieRepository } from "../../domain/categorie.repository";
import { assertCanCreateCategorie } from "../../domain/categorie.rules";
import { toCategorieDto } from "../dtos/categorie.dto";

type Input = {
  name: string;
  categorieRepository: CategorieRepository;
};

export async function createCategorieUseCase(input: Input) {
  assertCanCreateCategorie();

  const categorie = await input.categorieRepository.create({
    name: input.name,
  });

  return toCategorieDto(categorie);
}

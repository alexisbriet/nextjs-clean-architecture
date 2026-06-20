import type { CategorieRepository } from "../../domain/categorie.repository";
import { toCategorieDto } from "../dtos/categorie.dto";

type Input = {
  categorieRepository: CategorieRepository;
};

export async function listCategorieUseCase(input: Input) {
  const categorie = await input.categorieRepository.findMany();

  return categorie.map(toCategorieDto);
}

import type { NewCategorie, Categorie } from "./categorie.entity";

export interface CategorieRepository {
  findMany(): Promise<Categorie[]>;
  create(data: NewCategorie): Promise<Categorie>;
}

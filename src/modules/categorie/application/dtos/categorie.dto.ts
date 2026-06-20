import type { Categorie } from "../../domain/categorie.entity";

export type CategorieDto = {
  id: string;
  name: string;
  createdAt: string;
};

export function toCategorieDto(categorie: Categorie): CategorieDto {
  return {
    id: categorie.id,
    name: categorie.name,
    createdAt: categorie.createdAt.toISOString(),
  };
}

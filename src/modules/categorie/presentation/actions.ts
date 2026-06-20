"use server";

import { revalidatePath } from "next/cache";
import { createCategorieUseCase } from "../application/use-cases/create-categorie.use-case";
import { prismaCategorieRepository } from "../infrastructure/prisma-categorie.repository";

export async function createCategorieAction(formData: FormData) {
  await createCategorieUseCase({
    name: readString(formData, "name", true),
    categorieRepository: prismaCategorieRepository,
  });

  revalidatePath("/categorie");
}

function readString(formData: FormData, key: string, required: true): string;
function readString(formData: FormData, key: string, required: false): string | undefined;
function readString(formData: FormData, key: string, required: boolean) {
  const value = String(formData.get(key) ?? "").trim();

  if (!value && required) {
    throw new Error(`Le champ ${key} est requis.`);
  }

  return value || undefined;
}

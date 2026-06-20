"use server";

import { revalidatePath } from "next/cache";
import { createInvoiceUseCase } from "../application/use-cases/create-invoice.use-case";
import { prismaInvoiceRepository } from "../infrastructure/prisma-invoice.repository";

export async function createInvoiceAction(formData: FormData) {
  await createInvoiceUseCase({
    name: readString(formData, "name", true),
    categoryId: readString(formData, "categoryId", false),
    invoiceRepository: prismaInvoiceRepository,
  });

  revalidatePath("/invoice");
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

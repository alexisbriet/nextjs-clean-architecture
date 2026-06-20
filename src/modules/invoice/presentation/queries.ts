import { listInvoiceUseCase } from "../application/use-cases/list-invoice.use-case";
import { prismaInvoiceRepository } from "../infrastructure/prisma-invoice.repository";

export async function getInvoice() {
  return listInvoiceUseCase({
    invoiceRepository: prismaInvoiceRepository,
  });
}

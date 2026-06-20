import type { InvoiceRepository } from "../domain/invoice.repository";

export const prismaInvoiceRepository: InvoiceRepository = {
  findMany() {
    throw new Error("Implement prismaInvoiceRepository.findMany after adding the Prisma model.");
  },

  create() {
    throw new Error("Implement prismaInvoiceRepository.create after adding the Prisma model.");
  },
};

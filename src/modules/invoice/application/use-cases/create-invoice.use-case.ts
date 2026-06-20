import type { InvoiceRepository } from "../../domain/invoice.repository";
import { assertCanCreateInvoice } from "../../domain/invoice.rules";
import { toInvoiceDto } from "../dtos/invoice.dto";

type Input = {
  name: string;
  categoryId?: string;
  invoiceRepository: InvoiceRepository;
};

export async function createInvoiceUseCase(input: Input) {
  assertCanCreateInvoice();

  const invoice = await input.invoiceRepository.create({
    name: input.name,
    categoryId: input.categoryId,
  });

  return toInvoiceDto(invoice);
}

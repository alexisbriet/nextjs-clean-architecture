import type { InvoiceRepository } from "../../domain/invoice.repository";
import { toInvoiceDto } from "../dtos/invoice.dto";

type Input = {
  invoiceRepository: InvoiceRepository;
};

export async function listInvoiceUseCase(input: Input) {
  const invoice = await input.invoiceRepository.findMany();

  return invoice.map(toInvoiceDto);
}

import type { NewInvoice, Invoice } from "./invoice.entity";

export interface InvoiceRepository {
  findMany(): Promise<Invoice[]>;
  create(data: NewInvoice): Promise<Invoice>;
}

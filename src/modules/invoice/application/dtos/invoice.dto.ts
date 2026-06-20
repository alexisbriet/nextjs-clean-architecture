export type RelationReferenceDto = {
  id: string;
  label?: string;
};

import type { Invoice } from "../../domain/invoice.entity";

export type InvoiceDto = {
  id: string;
  name: string;
  categoryId?: string;
  category?: RelationReferenceDto;
  createdAt: string;
};

export function toInvoiceDto(invoice: Invoice): InvoiceDto {
  return {
    id: invoice.id,
    name: invoice.name,
    categoryId: invoice.categoryId,
    category: invoice.category,
    createdAt: invoice.createdAt.toISOString(),
  };
}

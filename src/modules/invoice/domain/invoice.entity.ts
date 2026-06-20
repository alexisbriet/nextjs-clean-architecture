export type RelationReference = {
  id: string;
  label?: string;
};

export type Invoice = {
  id: string;
  name: string;
  categoryId?: string;
  category?: RelationReference;
  createdAt: Date;
  updatedAt: Date;
};

export type NewInvoice = {
  name: string;
  categoryId?: string;
};

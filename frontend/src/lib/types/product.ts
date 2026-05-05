// types/product.ts
export type Product = {
  id: string;
  created_at: string;
  updated_at: string;
  tenant_id: string;
  category_id: string;
  name: string;
  price: number;
  stock: number;
};

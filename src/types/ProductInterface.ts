export interface Product {
  id: number;
  code: string;
  product: string;
  price: number;
  category_id: number | null;
  description: string | null;
  prev_price: number | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProduct {
  code: string;
  product: string;
  price: number;
  category_id: number | null;
  description: string | null;
  prev_price: number | null;
  image_url: string | null;
}

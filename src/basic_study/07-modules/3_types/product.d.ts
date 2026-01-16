// ============================================
// Product 관련 타입 정의
// ============================================

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  stock: number;
  isActive: boolean;
}

export type ProductCategory =
  | "electronics"
  | "clothing"
  | "food"
  | "books"
  | "toys";

export interface ProductWithDiscount extends Product {
  discountRate: number;
  finalPrice: number;
}

export interface CreateProductDto {
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  stock: number;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  description?: string;
  stock?: number;
  isActive?: boolean;
}

export type ProductSummary = Pick<Product, "id" | "name" | "price">;

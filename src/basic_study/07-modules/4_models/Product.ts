// ============================================
// Product Model (상품 모델)
// ============================================

import type {
  Product as IProduct,
  ProductCategory,
} from "../3_types/product.js";

export class Product implements IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  stock: number;
  isActive: boolean;

  constructor(
    id: number,
    name: string,
    price: number,
    description: string,
    category: ProductCategory,
    stock: number = 0
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.stock = stock;
    this.isActive = true;
  }

  // 재고 관리
  addStock(quantity: number): void {
    if (quantity < 0) {
      throw new Error("Quantity must be positive");
    }
    this.stock += quantity;
  }

  removeStock(quantity: number): void {
    if (quantity > this.stock) {
      throw new Error("Not enough stock");
    }
    this.stock -= quantity;
  }

  isInStock(): boolean {
    return this.stock > 0 && this.isActive;
  }

  // 가격 관련
  applyDiscount(discountRate: number): number {
    if (discountRate < 0 || discountRate > 100) {
      throw new Error("Discount rate must be between 0 and 100");
    }
    return this.price * (1 - discountRate / 100);
  }

  getPriceWithTax(taxRate: number = 10): number {
    return this.price * (1 + taxRate / 100);
  }

  // 활성화/비활성화
  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  // 정적 메서드
  static createElectronics(
    id: number,
    name: string,
    price: number,
    description: string
  ): Product {
    return new Product(id, name, price, description, "electronics");
  }

  // 정보 출력
  getInfo(): string {
    return `${this.name} - ${this.category} (₩${this.price.toLocaleString()})`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
      category: this.category,
      stock: this.stock,
      isActive: this.isActive,
    };
  }
}

// 추가 타입 export
export type { ProductCategory } from "../3_types/product.js";

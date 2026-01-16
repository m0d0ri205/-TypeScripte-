// ============================================
// Order Model (주문 모델)
// ============================================

import { User } from "./User.js";
import { Product } from "./Product.js";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export class Order {
  id: number;
  user: User;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, user: User) {
    this.id = id;
    this.user = user;
    this.items = [];
    this.status = "pending";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // 상품 추가
  addItem(product: Product, quantity: number): void {
    if (quantity <= 0) {
      throw new Error("Quantity must be positive");
    }

    if (!product.isInStock()) {
      throw new Error(`Product ${product.name} is out of stock`);
    }

    if (product.stock < quantity) {
      throw new Error(`Not enough stock for ${product.name}`);
    }

    // 이미 있는 상품인지 확인
    const existingItem = this.items.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        product,
        quantity,
        price: product.price,
      });
    }

    this.updatedAt = new Date();
  }

  // 상품 제거
  removeItem(productId: number): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.updatedAt = new Date();
  }

  // 총액 계산
  getTotal(): number {
    return this.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  getTotalWithTax(taxRate: number = 10): number {
    const subtotal = this.getTotal();
    return subtotal * (1 + taxRate / 100);
  }

  // 주문 상태 변경
  confirm(): void {
    if (this.status !== "pending") {
      throw new Error("Only pending orders can be confirmed");
    }
    this.status = "confirmed";
    this.updatedAt = new Date();
  }

  ship(): void {
    if (this.status !== "confirmed") {
      throw new Error("Only confirmed orders can be shipped");
    }
    this.status = "shipped";
    this.updatedAt = new Date();
  }

  deliver(): void {
    if (this.status !== "shipped") {
      throw new Error("Only shipped orders can be delivered");
    }
    this.status = "delivered";
    this.updatedAt = new Date();
  }

  cancel(): void {
    if (this.status === "delivered") {
      throw new Error("Delivered orders cannot be cancelled");
    }
    this.status = "cancelled";
    this.updatedAt = new Date();
  }

  // 정보 출력
  getInfo(): string {
    return `Order #${this.id} - ${this.user.name} - ${this.status} - ₩${this.getTotal().toLocaleString()}`;
  }

  getSummary(): string {
    const itemList = this.items
      .map((item) => `  - ${item.product.name} x${item.quantity}`)
      .join("\n");
    return `
Order #${this.id}
Customer: ${this.user.name}
Status: ${this.status}
Items:
${itemList}
Total: ₩${this.getTotal().toLocaleString()}
    `.trim();
  }

  toJSON() {
    return {
      id: this.id,
      user: this.user.toJSON(),
      items: this.items.map((item) => ({
        product: item.product.toJSON(),
        quantity: item.quantity,
        price: item.price,
      })),
      status: this.status,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}

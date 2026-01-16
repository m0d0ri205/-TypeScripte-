// ============================================
// ProductService (상품 비즈니스 로직)
// ============================================

import { Product } from "../4_models/Product.js";
import type { ProductCategory, CreateProductDto, UpdateProductDto } from "../3_types/product.js";

export class ProductService {
  private products: Map<number, Product>;
  private nextId: number;

  constructor() {
    this.products = new Map();
    this.nextId = 1;
  }

  // 상품 생성
  createProduct(dto: CreateProductDto): Product {
    const product = new Product(
      this.nextId++,
      dto.name,
      dto.price,
      dto.description,
      dto.category,
      dto.stock
    );

    this.products.set(product.id, product);
    console.log(`✅ Product created: ${product.getInfo()}`);
    return product;
  }

  // 상품 조회
  getProductById(id: number): Product | undefined {
    return this.products.get(id);
  }

  getAllProducts(): Product[] {
    return Array.from(this.products.values());
  }

  getActiveProducts(): Product[] {
    return this.getAllProducts().filter((p) => p.isActive);
  }

  getInStockProducts(): Product[] {
    return this.getAllProducts().filter((p) => p.isInStock());
  }

  // 카테고리별 조회
  getProductsByCategory(category: ProductCategory): Product[] {
    return this.getAllProducts().filter((p) => p.category === category);
  }

  // 가격대별 조회
  getProductsByPriceRange(min: number, max: number): Product[] {
    return this.getAllProducts().filter(
      (p) => p.price >= min && p.price <= max
    );
  }

  // 상품 수정
  updateProduct(id: number, dto: UpdateProductDto): Product {
    const product = this.products.get(id);

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    if (dto.name) product.name = dto.name;
    if (dto.price !== undefined) product.price = dto.price;
    if (dto.description) product.description = dto.description;
    if (dto.stock !== undefined) product.stock = dto.stock;
    if (dto.isActive !== undefined) product.isActive = dto.isActive;

    console.log(`✅ Product updated: ${product.getInfo()}`);
    return product;
  }

  // 상품 삭제
  deleteProduct(id: number): boolean {
    const deleted = this.products.delete(id);
    if (deleted) {
      console.log(`✅ Product deleted: ${id}`);
    } else {
      console.log(`❌ Product not found: ${id}`);
    }
    return deleted;
  }

  // 재고 관리
  addStock(id: number, quantity: number): Product {
    const product = this.products.get(id);

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    product.addStock(quantity);
    console.log(`✅ Stock added: ${product.name} (+${quantity}) = ${product.stock}`);
    return product;
  }

  removeStock(id: number, quantity: number): Product {
    const product = this.products.get(id);

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    product.removeStock(quantity);
    console.log(`✅ Stock removed: ${product.name} (-${quantity}) = ${product.stock}`);
    return product;
  }

  // 할인 적용
  applyDiscount(id: number, discountRate: number): number {
    const product = this.products.get(id);

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    const discountedPrice = product.applyDiscount(discountRate);
    console.log(
      `💰 Discount applied: ${product.name} (${discountRate}%) = ₩${discountedPrice.toLocaleString()}`
    );
    return discountedPrice;
  }

  // 검색
  searchProducts(keyword: string): Product[] {
    const lowerKeyword = keyword.toLowerCase();
    return this.getAllProducts().filter(
      (p) =>
        p.name.toLowerCase().includes(lowerKeyword) ||
        p.description.toLowerCase().includes(lowerKeyword)
    );
  }

  // 정렬
  sortByPrice(ascending: boolean = true): Product[] {
    const products = this.getAllProducts();
    return products.sort((a, b) =>
      ascending ? a.price - b.price : b.price - a.price
    );
  }

  sortByName(): Product[] {
    const products = this.getAllProducts();
    return products.sort((a, b) => a.name.localeCompare(b.name));
  }

  // 통계
  getStats() {
    const products = this.getAllProducts();
    const totalValue = products.reduce(
      (sum, p) => sum + p.price * p.stock,
      0
    );

    return {
      total: products.length,
      active: products.filter((p) => p.isActive).length,
      inStock: products.filter((p) => p.isInStock()).length,
      totalStock: products.reduce((sum, p) => sum + p.stock, 0),
      totalValue,
      averagePrice:
        products.length > 0
          ? products.reduce((sum, p) => sum + p.price, 0) / products.length
          : 0,
    };
  }

  // 카테고리별 통계
  getCategoryStats(): Record<ProductCategory, number> {
    const stats: Record<ProductCategory, number> = {
      electronics: 0,
      clothing: 0,
      food: 0,
      books: 0,
      toys: 0,
    };

    this.getAllProducts().forEach((p) => {
      stats[p.category]++;
    });

    return stats;
  }

  // 초기화
  clear(): void {
    this.products.clear();
    this.nextId = 1;
    console.log("✅ All products cleared");
  }
}

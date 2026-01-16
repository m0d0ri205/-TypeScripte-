// ============================================
// 모듈 Import 예제 (실제 동작하는 코드)
// ============================================

// ============================================
// 1. Named Import - 개별 import
// ============================================

import { User } from "./4_models/User.js";
import { UserService } from "./5_services/UserService.js";
import { validateEmail } from "./6_utils/validators.js";

console.log("\n=== 1. Named Import - 개별 import ===");

const user1 = new User(1, "철수", "chulsoo@example.com", "user");
console.log(user1.getInfo());

const userService = new UserService();
userService.createUser({
  name: "영희",
  email: "younghee@example.com",
  password: "pass123",
});

console.log("Email validation:", validateEmail("test@example.com")); // true
console.log("Email validation:", validateEmail("invalid")); // false

// ============================================
// 2. Named Import - 이름 바꿔서 import
// ============================================

import {
  UserService as US,
} from "./5_services/UserService.js";
import { validateEmail as checkEmail } from "./6_utils/validators.js";

console.log("\n=== 2. Named Import - 이름 바꿔서 import ===");

const service = new US();
console.log("Check email:", checkEmail("test@test.com"));

// ============================================
// 3. Named Import - 전체 import (namespace)
// ============================================

import * as UserUtils from "./6_utils/validators.js";

console.log("\n=== 3. Named Import - 전체 import ===");

console.log("Validate email:", UserUtils.validateEmail("test@test.com"));
console.log("Validate password:", UserUtils.validatePassword("Pass1234"));

// ============================================
// 4. 여러 모듈에서 import
// ============================================

import { Product } from "./4_models/Product.js";
import { ProductService } from "./5_services/ProductService.js";
import { Order } from "./4_models/Order.js";

console.log("\n=== 4. 여러 모듈에서 import ===");

const user3 = new User(3, "민수", "minsu@example.com", "user");
console.log(user3.getInfo());

const product = new Product(
  1,
  "노트북",
  1500000,
  "고성능 노트북",
  "electronics",
  10
);
console.log(product.getInfo());

const order = new Order(1, user3);
order.addItem(product, 2);
console.log(order.getSummary());

// ============================================
// 5. 유틸리티 통합 import
// ============================================

import { formatCurrency, formatDate } from "./6_utils/index.js";

console.log("\n=== 5. 유틸리티 통합 import ===");

console.log("Price:", formatCurrency(1500000));
console.log("Date:", formatDate(new Date()));

// ============================================
// 6. 서비스 레이어 활용
// ============================================

console.log("\n=== 6. 서비스 레이어 활용 ===");

const productService = new ProductService();

const laptop = productService.createProduct({
  name: "맥북",
  price: 2000000,
  description: "애플 노트북",
  category: "electronics",
  stock: 5,
});

const keyboard = productService.createProduct({
  name: "키보드",
  price: 150000,
  description: "기계식 키보드",
  category: "electronics",
  stock: 20,
});

console.log("\nProduct Stats:", productService.getStats());

// ============================================
// 7. 실전 예제: 주문 처리 플로우
// ============================================

console.log("\n=== 7. 실전 예제: 주문 처리 플로우 ===");

// 사용자 생성
const customer = userService.createUser({
  name: "고객1",
  email: "customer1@example.com",
  password: "pass123",
});

// 주문 생성
const newOrder = new Order(2, customer);
newOrder.addItem(laptop, 1);
newOrder.addItem(keyboard, 2);

console.log("\nOrder created:");
console.log(newOrder.getSummary());

// 주문 상태 변경
console.log("\n주문 상태 변경:");
newOrder.confirm();
console.log("✅ 주문 확인됨");

newOrder.ship();
console.log("✅ 배송 시작");

newOrder.deliver();
console.log("✅ 배송 완료");

console.log("\n최종 주문 정보:");
console.log(newOrder.getSummary());

// ============================================
// 8. 통계 출력
// ============================================

console.log("\n=== 8. 최종 통계 ===");
console.log("User Stats:", userService.getStats());
console.log("Product Stats:", productService.getStats());
console.log(
  "Total Order Amount:",
  formatCurrency(order.getTotal() + newOrder.getTotal())
);

console.log("\n✅ 모든 테스트 완료!\n");

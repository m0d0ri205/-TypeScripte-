// ============================================
// 모듈 실습 문제
// ============================================

// ============================================
// 실습 1: Export 방식 이해하기
// ============================================
// TODO: 1_exports 폴더의 파일들을 import 해보세요

// 1-1. named-export.ts에서 add, multiply, Calculator를 import
// import { add, multiply, Calculator } from "./1_exports/named-export";

// 1-2. default-export.ts에서 Database를 import
// import Database from "./1_exports/default-export";

// 1-3. mixed-export.ts에서 default와 named를 함께 import
// import ApiClient, { DEFAULT_TIMEOUT, createHeaders } from "./1_exports/mixed-export";

// ============================================
// 실습 2: 모델 사용하기
// ============================================
// TODO: User, Product, Order 모델을 사용해보세요

// import { User } from "./4_models/User";
// import { Product } from "./4_models/Product";
// import { Order } from "./4_models/Order";

// 2-1. User 생성하기
// const user1 = new User(1, "홍길동", "hong@example.com", "user");
// console.log(user1.getInfo());

// 2-2. Product 생성하고 재고 관리하기
// const product1 = new Product(1, "노트북", 1500000, "고성능 노트북", "electronics", 10);
// product1.addStock(5);
// console.log(product1.getInfo());

// 2-3. Order 생성하고 상품 추가하기
// const order1 = new Order(1, user1);
// order1.addItem(product1, 2);
// console.log(order1.getSummary());

// ============================================
// 실습 3: 서비스 사용하기
// ============================================
// TODO: UserService, ProductService를 사용해보세요

// import { UserService } from "./5_services/UserService";
// import { ProductService } from "./5_services/ProductService";

// 3-1. UserService로 사용자 관리
// const userService = new UserService();
// const newUser = userService.createUser({
//   name: "김철수",
//   email: "kim@example.com",
//   password: "password123"
// });
// console.log(userService.getStats());

// 3-2. ProductService로 상품 관리
// const productService = new ProductService();
// const newProduct = productService.createProduct({
//   name: "키보드",
//   price: 150000,
//   description: "기계식 키보드",
//   category: "electronics",
//   stock: 20
// });
// console.log(productService.getStats());

// ============================================
// 실습 4: 유틸리티 사용하기
// ============================================
// TODO: validators, formatters, helpers를 사용해보세요

// 방법 1: 개별 import
// import { validateEmail, formatCurrency, delay } from "./6_utils";

// 방법 2: 전체 import
// import * as Utils from "./6_utils";

// 4-1. Validators 사용
// console.log(validateEmail("test@example.com")); // true
// console.log(validateEmail("invalid-email")); // false

// 4-2. Formatters 사용
// console.log(formatCurrency(1500000)); // ₩1,500,000
// console.log(formatDate(new Date())); // 2024-01-15

// 4-3. Helpers 사용
// const numbers = [1, 2, 3, 4, 5];
// console.log(shuffle(numbers));
// console.log(sum(numbers)); // 15

// ============================================
// 도전 과제 1: 나만의 모듈 만들기
// ============================================
// TODO: 아래 요구사항에 맞는 모듈을 만들어보세요

// 1. `8_my-module/` 폴더 생성
// 2. 다음 파일들 생성:
//    - types.d.ts: 타입 정의
//    - Calculator.ts: 계산기 클래스
//    - constants.ts: 상수들
//    - utils.ts: 유틸리티 함수들
//    - index.ts: 통합 export

// 예시 구조:
// export class Calculator {
//   add(a: number, b: number): number { return a + b; }
//   subtract(a: number, b: number): number { return a - b; }
//   multiply(a: number, b: number): number { return a * b; }
//   divide(a: number, b: number): number { return a / b; }
// }

// ============================================
// 도전 과제 2: E-Commerce 시스템 만들기
// ============================================
// TODO: 위에서 배운 모든 것을 활용하여 간단한 쇼핑몰 시스템을 만들어보세요

// 요구사항:
// 1. 사용자 3명 생성 (일반 유저 2명, 관리자 1명)
// 2. 상품 5개 생성 (다양한 카테고리)
// 3. 주문 2개 생성
// 4. 주문 상태 변경 (pending → confirmed → shipped → delivered)
// 5. 통계 출력 (사용자 수, 상품 수, 총 주문 금액 등)

// 예시:
// const userService = new UserService();
// const productService = new ProductService();

// // 사용자 생성
// const admin = userService.createAdmin("관리자", "admin@shop.com");
// const user1 = userService.createUser({ name: "고객1", email: "user1@shop.com", password: "pass123" });
// const user2 = userService.createUser({ name: "고객2", email: "user2@shop.com", password: "pass123" });

// // 상품 생성
// const laptop = productService.createProduct({
//   name: "노트북",
//   price: 1500000,
//   description: "고성능 노트북",
//   category: "electronics",
//   stock: 10
// });

// // ... 계속 작성

// ============================================
// 도전 과제 3: 모듈 리팩토링
// ============================================
// TODO: 기존 코드를 모듈로 분리해보세요

// 만약 아래와 같은 긴 코드가 있다면:
/*
function validateEmail(email: string): boolean { ... }
function formatCurrency(amount: number): string { ... }
class User { ... }
class Product { ... }
// ... 수백 줄의 코드
*/

// 이를 다음과 같이 모듈로 분리:
// - validators.ts: 검증 함수들
// - formatters.ts: 포맷 함수들
// - models/User.ts: User 클래스
// - models/Product.ts: Product 클래스
// - index.ts: 모든 것을 통합

// ============================================
// 힌트 및 팁
// ============================================

// 💡 Tip 1: 파일명과 클래스명 일치시키기
// User.ts → export class User
// Product.ts → export class Product

// 💡 Tip 2: index.ts로 편리하게 import
// export * from './User';
// export * from './Product';
// 그러면: import { User, Product } from './models';

// 💡 Tip 3: 타입만 import 하기
// import type { User } from './types/user';
// 컴파일 시 제거됨 (번들 크기 감소)

// 💡 Tip 4: 이름 충돌 해결
// import { User as UserModel } from './models/User';
// import { User as UserType } from './types/user';

// 💡 Tip 5: 순환 참조 조심
// A가 B를 import하고, B가 A를 import하면 에러!
// 해결: 공통 타입을 별도 파일로 분리

console.log("\n🎯 실습을 시작하세요!");
console.log("위의 주석을 하나씩 해제하면서 실습해보세요.\n");

// src/06-class-basic.ts

// ============================================
// 1. 기본 클래스
// ============================================

class User {
  // 속성 선언
  id: number;
  name: string;
  email: string;

  // 생성자
  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // 메서드
  greet(): string {
    return `안녕하세요, ${this.name}님!`;
  }

  getInfo(): string {
    return `ID: ${this.id}, Email: ${this.email}`;
  }
}

// 인스턴스 생성
const user1 = new User(1, "철수", "chulsoo@example.com");
console.log(user1.greet());     // "안녕하세요, 철수님!"
console.log(user1.getInfo());   // "ID: 1, Email: chulsoo@example.com"

// ============================================
// 2. 단축 생성자 (Parameter Properties)
// ============================================

// 위 코드를 더 간단하게!
class User2 {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {
    // this.id = id; 자동으로 됨!
    // this.name = name; 자동으로 됨!
    // this.email = email; 자동으로 됨!
  }

  greet(): string {
    return `안녕하세요, ${this.name}님!`;
  }
}

const user2 = new User2(1, "영희", "younghee@example.com");
console.log(user2.name);  // "영희"

// ============================================
// 3. 기본값 설정
// ============================================

class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public stock: number = 0,        // 기본값
    public isActive: boolean = true  // 기본값
  ) {}

  getInfo(): string {
    return `${this.name}: ${this.price}원 (재고: ${this.stock})`;
  }
}

const product1 = new Product(1, "노트북", 1500000);
console.log(product1.stock);    // 0 (기본값)
console.log(product1.isActive); // true (기본값)

const product2 = new Product(2, "마우스", 25000, 100, false);
console.log(product2.stock);    // 100

// ============================================
// 4. 메서드에서 this 사용
// ============================================

class Counter {
  private count: number = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }

  getCount(): number {
    return this.count;
  }

  reset(): void {
    this.count = 0;
  }
}

const counter = new Counter();
counter.increment();
counter.increment();
counter.increment();
console.log(counter.getCount());  // 3

counter.decrement();
console.log(counter.getCount());  // 2

counter.reset();
console.log(counter.getCount());  // 0
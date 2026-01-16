// src/06-inheritance.ts

// ============================================
// 1. 기본 상속
// ============================================

class Animal {
  constructor(
    protected name: string,
    protected age: number
  ) {}

  makeSound(): void {
    console.log("돼지는 영어로 피그");
  }

  getInfo(): string {
    return `이름: ${this.name}, 나이: ${this.age}`;
  }
}

class Dog extends Animal {
  constructor(
    name: string,
    age: number,
    private breed: string  // Dog만의 속성
  ) {
    super(name, age);  // 부모 생성자 호출
  }

  // 메서드 오버라이딩
  makeSound(): void {
    console.log(`${this.name}가 멍멍!`);
  }

  // Dog만의 메서드
  fetch(): void {
    console.log(`${this.name}가 공을 물어옵니다!`);
  }

  // 부모 메서드 확장
  getInfo(): string {
    return `${super.getInfo()}, 품종: ${this.breed}`;
  }
}

class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age);
  }

  makeSound(): void {
    console.log(`${this.name}가 야옹~`);
  }

  scratch(): void {
    console.log(`${this.name}가 할퀸다!`);
  }
}

const dog = new Dog("멍멍이", 3, "진돗개");
dog.makeSound();  // "멍멍이가 멍멍!"
dog.fetch();      // "멍멍이가 공을 물어옵니다!"
console.log(dog.getInfo());  // "이름: 멍멍이, 나이: 3, 품종: 진돗개"

const cat = new Cat("야옹이", 2);
cat.makeSound();  // "야옹이가 야옹~"
cat.scratch();    // "야옹이가 할퀸다!"

// ============================================
// 2. 실전: User 상속
// ============================================

class User {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}

  getInfo(): string {
    return `${this.name} (${this.email})`;
  }
}

class Admin extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    private permissions: string[]
  ) {
    super(id, name, email);
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  addPermission(permission: string): void {
    if (!this.hasPermission(permission)) {
      this.permissions.push(permission);
      console.log(`권한 추가: ${permission}`);
    }
  }

  getInfo(): string {
    return `[관리자] ${super.getInfo()} - 권한: ${this.permissions.length}개`;
  }
}

class Customer extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    private orderCount: number = 0
  ) {
    super(id, name, email);
  }

  placeOrder(): void {
    this.orderCount++;
    console.log(`주문 완료! 총 주문: ${this.orderCount}개`);
  }

  getInfo(): string {
    return `[고객] ${super.getInfo()} - 주문: ${this.orderCount}개`;
  }
}

const admin = new Admin(1, "관리자", "admin@example.com", ["read", "write"]);
console.log(admin.getInfo());
admin.addPermission("delete");
console.log(admin.hasPermission("delete"));  // true

const customer = new Customer(2, "고객", "customer@example.com");
customer.placeOrder();
customer.placeOrder();
console.log(customer.getInfo());
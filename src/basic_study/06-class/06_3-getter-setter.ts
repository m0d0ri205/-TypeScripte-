// src/06-getter-setter.ts

// ============================================
// 1. 기본 getter/setter
// ============================================

class Person {
  private _age: number;

  constructor(age: number) {
    this._age = age;
  }

  // getter - 속성처럼 접근
  get age(): number {
    console.log("age getter 호출");
    return this._age;
  }

  // setter - 속성처럼 할당
  set age(value: number) {
    console.log("age setter 호출");
    if (value < 0) {
      throw new Error("나이는 0보다 작을 수 없습니다!");
    }
    this._age = value;
  }
}

const person = new Person(25);

// getter 사용 (메서드가 아닌 속성처럼!)
console.log(person.age);  // 25
// age getter 호출

// setter 사용 (메서드가 아닌 속성처럼!)
person.age = 26;  // setter 호출
console.log(person.age);  // 26

// person.age = -5;  // ❌ 에러! "나이는 0보다 작을 수 없습니다!"

// ============================================
// 2. 실전: 유효성 검증
// ============================================

class Product {
  private _name: string;
  private _price: number;

  constructor(name: string, price: number) {
    this._name = name;
    this._price = price;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (value.length < 2) {
      throw new Error("상품명은 2글자 이상이어야 합니다!");
    }
    this._name = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (value < 0) {
      throw new Error("가격은 0보다 작을 수 없습니다!");
    }
    this._price = value;
  }

  // 할인가 (getter만 있고 setter 없음 = 읽기 전용)
  get discountPrice(): number {
    return this._price * 0.9;  // 10% 할인
  }
}

const product = new Product("노트북", 1500000);
console.log(product.name);           // "노트북"
console.log(product.price);          // 1500000
console.log(product.discountPrice);  // 1350000

product.price = 1200000;  // ✅ OK
console.log(product.discountPrice);  // 1080000

// product.discountPrice = 1000000;  // ❌ 에러! setter 없음

// ============================================
// 3. 계산된 속성
// ============================================

class Rectangle {
  constructor(
    private _width: number,
    private _height: number
  ) {}

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    if (value <= 0) throw new Error("너비는 0보다 커야 합니다!");
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    if (value <= 0) throw new Error("높이는 0보다 커야 합니다!");
    this._height = value;
  }

  // 계산된 속성들 (getter만)
  get area(): number {
    return this._width * this._height;
  }

  get perimeter(): number {
    return 2 * (this._width + this._height);
  }
}

const rect = new Rectangle(10, 20);
console.log(rect.area);       // 200
console.log(rect.perimeter);  // 60

rect.width = 15;
console.log(rect.area);       // 300 (자동 재계산!)

// ============================================
// 4. 실전: User 클래스
// ============================================

class User {
  private _firstName: string;
  private _lastName: string;
  private _email: string;

  constructor(firstName: string, lastName: string, email: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    if (value.length === 0) throw new Error("이름은 필수입니다!");
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    if (value.length === 0) throw new Error("성은 필수입니다!");
    this._lastName = value;
  }

  // fullName: getter와 setter 모두 제공
  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  set fullName(value: string) {
    const parts = value.split(" ");
    if (parts.length !== 2) {
      throw new Error("전체 이름은 '이름 성' 형식이어야 합니다!");
    }
    this._firstName = parts[0]!;
    this._lastName = parts[1]!;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    if (!value.includes("@")) {
      throw new Error("유효한 이메일이 아닙니다!");
    }
    this._email = value;
  }
}

const user = new User("철수", "김", "chulsoo@example.com");
console.log(user.fullName);  // "철수 김"

user.fullName = "영희 이";   // setter로 분리해서 저장
console.log(user.firstName); // "영희"
console.log(user.lastName);  // "이"
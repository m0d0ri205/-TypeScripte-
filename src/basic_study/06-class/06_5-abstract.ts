
// src/06-abstract.ts

// ============================================
// 1. 기본 Abstract 클래스
// ============================================

abstract class Shape {
  constructor(protected color: string) {}

  // 추상 메서드 (구현 없음, 자식이 반드시 구현)
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // 일반 메서드 (구현 있음)
  describe(): string {
    return `${this.color} 도형 - 넓이: ${this.getArea()}`;
  }
}

// const shape = new Shape("red");  // ❌ 에러! 추상 클래스는 인스턴스 생성 불가

class Circle extends Shape {
  constructor(
    color: string,
    private radius: number
  ) {
    super(color);
  }

  // 추상 메서드 구현 (필수!)
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    color: string,
    private width: number,
    private height: number
  ) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const circle = new Circle("빨강", 5);
console.log(circle.describe());     // "빨강 도형 - 넓이: 78.5..."
console.log(circle.getArea());      // 78.5...
console.log(circle.getPerimeter()); // 31.4...

const rect = new Rectangle("파랑", 10, 20);
console.log(rect.describe());       // "파랑 도형 - 넓이: 200"
console.log(rect.getArea());        // 200

// ============================================
// 2. 실전: Repository 패턴
// ============================================

interface Entity {
  id: number;
}

abstract class Repository<T extends Entity> {
  protected items: T[] = [];

  // 추상 메서드
  abstract validate(item: T): boolean;

  // 구현된 메서드
  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  findAll(): T[] {
    return [...this.items];
  }

  create(item: T): T {
    if (!this.validate(item)) {
      throw new Error("유효하지 않은 데이터입니다!");
    }
    this.items.push(item);
    console.log(`생성됨: ID ${item.id}`);
    return item;
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      console.log(`삭제됨: ID ${id}`);
      return true;
    }
    return false;
  }
}

interface User extends Entity {
  name: string;
  email: string;
}

class UserRepository extends Repository<User> {
  validate(user: User): boolean {
    return (
      user.name.length > 0 &&
      user.email.includes("@")
    );
  }

  findByEmail(email: string): User | undefined {
    return this.items.find(user => user.email === email);
  }
}

const userRepo = new UserRepository();

userRepo.create({ id: 1, name: "철수", email: "chulsoo@example.com" });
userRepo.create({ id: 2, name: "영희", email: "younghee@example.com" });

console.log(userRepo.findById(1));
console.log(userRepo.findByEmail("younghee@example.com"));
console.log(userRepo.findAll().length);  // 2

userRepo.delete(1);
console.log(userRepo.findAll().length);  // 1
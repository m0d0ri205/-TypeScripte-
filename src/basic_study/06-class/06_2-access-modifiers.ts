// src/06-access-modifiers.ts

// ============================================
// 1. public (기본값) - 어디서나 접근 가능
// ============================================

class PublicExample {
  public name: string;  // public 명시 (생략 가능)

  constructor(name: string) {
    this.name = name;
  }
}

const example1 = new PublicExample("테스트");
console.log(example1.name);  // ✅ OK - 외부에서 접근 가능
example1.name = "변경";      // ✅ OK - 외부에서 수정 가능

// ============================================
// 2. private - 클래스 내부에서만 접근 가능
// ============================================

class BankAccount {
  private balance: number;  // private!

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  // public 메서드로 balance 조회
  getBalance(): number {
    return this.balance;
  }

  // public 메서드로 입금
  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`${amount}원 입금. 잔액: ${this.balance}원`);
    }
  }

  // public 메서드로 출금
  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`${amount}원 출금. 잔액: ${this.balance}원`);
    } else {
      console.log("잔액이 부족합니다!");
    }
  }
}

const account = new BankAccount(10000);
console.log(account.getBalance());  // ✅ OK - 10000

// console.log(account.balance);    // ❌ 에러! private 속성
// account.balance = 999999;        // ❌ 에러! 직접 수정 불가

account.deposit(5000);   // ✅ OK - 메서드로 입금
account.withdraw(3000);  // ✅ OK - 메서드로 출금

// ============================================
// 3. protected - 클래스와 상속받은 클래스에서 접근 가능
// ============================================

class Animal {
  protected name: string;  // protected!

  constructor(name: string) {
    this.name = name;
  }

  protected makeSound(): string {
    return "소리를 냅니다";
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  bark(): void {
    // ✅ OK - 상속받은 클래스에서 protected 접근 가능
    console.log(`${this.name}가 멍멍!`);
    console.log(this.makeSound());
  }
}

const dog = new Dog("멍멍이");
dog.bark();  // ✅ OK

// console.log(dog.name);       // ❌ 에러! protected는 외부 접근 불가
// dog.makeSound();             // ❌ 에러! protected 메서드

// ============================================
// 4. 실전 예제: User 클래스
// ============================================

class User {
  public readonly id: number;      // public + readonly
  public name: string;
  private password: string;        // private
  protected role: string;          // protected

  constructor(id: number, name: string, password: string, role: string) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.role = role;
  }

  // 비밀번호 검증
  checkPassword(inputPassword: string): boolean {
    return this.password === inputPassword;
  }

  // 비밀번호 변경
  changePassword(oldPassword: string, newPassword: string): void {
    if (this.checkPassword(oldPassword)) {
      this.password = newPassword;
      console.log("비밀번호가 변경되었습니다.");
    } else {
      console.log("기존 비밀번호가 일치하지 않습니다.");
    }
  }

  getInfo(): string {
    return `ID: ${this.id}, Name: ${this.name}, Role: ${this.role}`;
  }
}

const user = new User(1, "철수", "secret123", "user");
console.log(user.name);           // ✅ OK - public
console.log(user.id);             // ✅ OK - public
// user.id = 2;                   // ❌ 에러! readonly
// console.log(user.password);    // ❌ 에러! private
// console.log(user.role);        // ❌ 에러! protected

console.log(user.checkPassword("secret123"));  // true
user.changePassword("secret123", "newpass456");

// ============================================
// 5. 접근 제어자 비교표
// ============================================

/*
┌────────────┬─────────┬──────────┬────────┬───────────┐
│            │ 클래스  │ 자식     │ 인스턴스│ 외부      │
│            │ 내부    │ 클래스   │         │           │
├────────────┼─────────┼──────────┼────────┼───────────┤
│ public     │ ✅      │ ✅       │ ✅     │ ✅        │
│ protected  │ ✅      │ ✅       │ ❌     │ ❌        │
│ private    │ ✅      │ ❌       │ ❌     │ ❌        │
└────────────┴─────────┴──────────┴────────┴───────────┘
*/
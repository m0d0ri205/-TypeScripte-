// src/06-implements.ts

// ============================================
// 1. 기본 implements
// ============================================

interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

class Document implements Printable, Saveable {
  constructor(private content: string) {}

  // Printable 구현
  print(): void {
    console.log("문서 출력:", this.content);
  }

  // Saveable 구현
  save(): void {
    console.log("문서 저장:", this.content);
  }
}

const doc = new Document("안녕하세요");
doc.print();  // "문서 출력: 안녕하세요"
doc.save();   // "문서 저장: 안녕하세요"

// ============================================
// 2. 실전: 로거 인터페이스
// ============================================

interface Logger {
  log(message: string): void;
  error(message: string): void;
  warn(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }

  warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }
}

class FileLogger implements Logger {
  constructor(private filename: string) {}

  log(message: string): void {
    console.log(`파일에 로그 저장: ${this.filename} - ${message}`);
  }

  error(message: string): void {
    console.log(`파일에 에러 저장: ${this.filename} - ${message}`);
  }

  warn(message: string): void {
    console.log(`파일에 경고 저장: ${this.filename} - ${message}`);
  }
}

// 사용
function doSomething(logger: Logger): void {
  logger.log("작업 시작");
  logger.warn("주의가 필요합니다");
  logger.log("작업 완료");
}

const consoleLogger = new ConsoleLogger();
const fileLogger = new FileLogger("app.log");

doSomething(consoleLogger);
doSomething(fileLogger);

// ============================================
// 3. 실전: 결제 시스템
// ============================================

interface PaymentMethod {
  processPayment(amount: number): boolean;
  refund(amount: number): boolean;
}

class CreditCard implements PaymentMethod {
  constructor(
    private cardNumber: string,
    private cvv: string
  ) {}

  processPayment(amount: number): boolean {
    console.log(`신용카드 결제: ${amount}원`);
    console.log(`카드번호: ${this.cardNumber}`);
    return true;
  }

  refund(amount: number): boolean {
    console.log(`신용카드 환불: ${amount}원`);
    return true;
  }
}

class BankTransfer implements PaymentMethod {
  constructor(
    private accountNumber: string,
    private bankName: string
  ) {}

  processPayment(amount: number): boolean {
    console.log(`계좌이체 결제: ${amount}원`);
    console.log(`${this.bankName} ${this.accountNumber}`);
    return true;
  }

  refund(amount: number): boolean {
    console.log(`계좌이체 환불: ${amount}원`);
    return true;
  }
}

class PaymentService {
  pay(method: PaymentMethod, amount: number): void {
    if (method.processPayment(amount)) {
      console.log("결제 성공!");
    } else {
      console.log("결제 실패!");
    }
  }
}

const paymentService = new PaymentService();
const creditCard = new CreditCard("1234-5678-9012-3456", "123");
const bankTransfer = new BankTransfer("110-123-456789", "카카오뱅크");

paymentService.pay(creditCard, 50000);
paymentService.pay(bankTransfer, 100000);
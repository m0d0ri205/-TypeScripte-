// src/06-decorators.ts

// ============================================
// 1. 클래스 데코레이터
// ============================================

function Logger(constructor: Function) {
  console.log("클래스 생성됨:", constructor.name);
}

@Logger
class Person {
  constructor(public name: string) {
    console.log("Person 인스턴스 생성:", name);
  }
}

const person1 = new Person("철수");
// 출력:
// "클래스 생성됨: Person"
// "Person 인스턴스 생성: 철수"

// ============================================
// 2. 메서드 데코레이터
// ============================================

function Log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`메서드 호출: ${propertyKey}`);
    console.log(`인자:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`결과:`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }

  @Log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const calc = new Calculator();
calc.add(5, 3);
// 출력:
// "메서드 호출: add"
// "인자: [5, 3]"
// "결과: 8"

calc.multiply(4, 7);
// 출력:
// "메서드 호출: multiply"
// "인자: [4, 7]"
// "결과: 28"

// ============================================
// 3. 실전: 성능 측정 데코레이터
// ============================================

function Measure(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyKey} 실행 시간: ${(end - start).toFixed(2)}ms`);
    return result;
  };

  return descriptor;
}

class DataProcessor {
  @Measure
  processData(data: number[]): number {
    // 무거운 작업 시뮬레이션
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return sum;
  }

  @Measure
  filterData(data: number[], threshold: number): number[] {
    return data.filter(n => n > threshold);
  }
}

const processor = new DataProcessor();
const numbers = Array.from({ length: 1000000 }, (_, i) => i);
processor.processData(numbers);
processor.filterData(numbers, 500000);

// ============================================
// 4. 속성 데코레이터
// ============================================

function MinValue(min: number) {
  return function (target: any, propertyKey: string) {
    let value: number;

    const getter = function () {
      return value;
    };

    const setter = function (newValue: number) {
      if (newValue < min) {
        throw new Error(`${propertyKey}는 ${min}보다 작을 수 없습니다!`);
      }
      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class Product {
  @MinValue(0)
  price!: number;

  @MinValue(0)
  stock!: number;

  constructor(price: number, stock: number) {
    this.price = price;
    this.stock = stock;
  }
}

const product = new Product(1000, 10);
console.log(product.price);  // 1000

// product.price = -500;  // ❌ 에러! "price는 0보다 작을 수 없습니다!"
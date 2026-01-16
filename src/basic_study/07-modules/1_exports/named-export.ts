// ============================================
// Named Export (이름있는 내보내기)
// ============================================
// 장점: 여러 개 내보낼 수 있음, 명시적
// 단점: import 시 정확한 이름 필요

// 1. 선언과 동시에 export
export const API_URL = "https://api.example.com";
export const MAX_RETRY = 3;

// 2. 함수 export
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

// 3. 클래스 export
export class Calculator {
  constructor(public name: string) {}

  calculate(a: number, b: number): number {
    return a + b;
  }
}

// 4. 타입/인터페이스 export
export interface Config {
  timeout: number;
  retries: number;
}

export type Status = "pending" | "success" | "error";

// 5. 나중에 한번에 export
const SECRET_KEY = "abc123";
const DEBUG_MODE = true;

function log(message: string): void {
  console.log(`[LOG] ${message}`);
}

export { SECRET_KEY, DEBUG_MODE, log };

// 6. 이름 바꿔서 export
const internalFunction = () => "internal";
export { internalFunction as publicFunction };

// src/04-utility-record.ts

// ============================================
// 기본 개념
// ============================================

// 수동으로 만들기 (힘듦)
interface ManualRecord {
  apple: number;
  banana: number;
  orange: number;
}

// Record로 만들기 (쉬움!)
type Fruit = "apple" | "banana" | "orange";
type FruitPrices = Record<Fruit, number>;

const prices: FruitPrices = {
  apple: 1000,
  banana: 1500,
  orange: 2000
  // 모든 과일의 가격이 필수!
};

// ============================================
// 실전 예제 1: 사용자 역할
// ============================================

type Role = "admin" | "editor" | "viewer";

type RolePermissions = Record<Role, string[]>;

const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"]
};

console.log(permissions.admin);  // ["read", "write", "delete"]

// ============================================
// 실전 예제 2: 에러 메시지
// ============================================

type ErrorCode = "NOT_FOUND" | "UNAUTHORIZED" | "SERVER_ERROR";

type ErrorMessages = Record<ErrorCode, string>;

const errorMessages: ErrorMessages = {
  NOT_FOUND: "요청한 리소스를 찾을 수 없습니다",
  UNAUTHORIZED: "권한이 없습니다",
  SERVER_ERROR: "서버 오류가 발생했습니다"
};

function getErrorMessage(code: ErrorCode): string {
  return errorMessages[code];
}

console.log(getErrorMessage("NOT_FOUND"));
// "요청한 리소스를 찾을 수 없습니다"

// ============================================
// 실전 예제 3: 사용자 목록
// ============================================

interface User {
  name: string;
  email: string;
}

// ID를 키로, User를 값으로
type UserMap = Record<number, User>;

const users: UserMap = {
  1: { name: "철수", email: "chulsoo@example.com" },
  2: { name: "영희", email: "younghee@example.com" },
  3: { name: "민수", email: "minsu@example.com" }
};

console.log(users[1]?.name);  // "철수"

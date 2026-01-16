// src/05-conditional-types.ts

// ============================================
// 1. 기본 조건부 타입
// ============================================

// T가 string이면 "문자열", 아니면 "기타"
type IsString<T> = T extends string ? "문자열" : "기타";

type A = IsString<string>;   // "문자열", true여서
type B = IsString<number>;   // "기타", false여서
type C = IsString<boolean>;  // "기타", false여서


// ============================================
// 2. 실용적 예제: 배열 체크
// ============================================

type IsArray<T> = T extends any[] ? "배열" : "배열 아님";

type D = IsArray<number[]>;   // "배열"
type E = IsArray<string[]>;   // "배열"
type F = IsArray<number>;     // "배열 아님"
type G = IsArray<string>;     // "배열 아님"


// ============================================
// 3. 실전: 함수 체크
// ============================================

type IsFunction<T> = T extends (...args: any[]) => any 
  ? "함수" 
  : "함수 아님";

type H = IsFunction<() => void>;           // "함수"
type I = IsFunction<(x: number) => string>; // "함수"
type J = IsFunction<number>;               // "함수 아님"
type K = IsFunction<string>;               // "함수 아님"

// ============================================
// 4. 중첩 조건부 타입 (여러 조건)
// ============================================

type TypeName<T> = 
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";

type L = TypeName<string>;      // "string"
type M = TypeName<123>;         // "number"
type N = TypeName<true>;        // "boolean"
type O = TypeName<undefined>;   // "undefined"
type P = TypeName<() => void>;  // "function"
type Q = TypeName<{}>;          // "object"

// ============================================
// 5. 실전 예제: API 응답 타입
// ============================================

type ApiResponse<T> = 
  T extends { error: any }
    ? { success: false; error: T["error"] }
    : { success: true; data: T };

// 에러가 있는 타입
type ErrorType = { error: string };
type ErrorResponse = ApiResponse<ErrorType>;
// { success: false; error: string }

// 정상 데이터 타입
type UserType = { id: number; name: string };
type UserResponse = ApiResponse<UserType>;
// { success: true; data: { id: number; name: string } }


// ============================================
// 6. 실전: Nullable 체크
// ============================================

type IsNullable<T> = null extends T ? "nullable" : "not nullable";

type R = IsNullable<string | null>;  // "nullable"
type S = IsNullable<string>;         // "not nullable"
type T = IsNullable<number | undefined>;  // "not nullable" (undefined는 null 아님)


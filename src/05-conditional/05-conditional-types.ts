// src/05-conditional-types.ts

// ============================================
// 1. 기본 조건부 타입
// ============================================

// T가 string이면 "문자열", 아니면 "기타"
type IsString<T> = T extends string ? "문자열" : "기타";

type A = IsString<string>;   // "문자열"
type B = IsString<number>;   // "기타"
type C = IsString<boolean>;  // "기타"

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
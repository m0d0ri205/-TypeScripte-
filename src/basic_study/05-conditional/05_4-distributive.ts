
// src/05-distributive.ts

// ============================================
// 1. 분산 조건부 타입 기본
// ============================================

type ToArray<T> = T extends any ? T[] : never;

// Union에 적용하면 자동 분산!
type StrOrNum = string | number;
type Arrays = ToArray<StrOrNum>;
// string[] | number[]

// 동작 과정:
// ToArray<string | number>
// → ToArray<string> | ToArray<number>  (자동 분산)
// → string[] | number[]

// ============================================
// 2. 분산 방지하기
// ============================================

// [] 로 감싸면 분산 안 됨
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type Arrays2 = ToArrayNonDist<string | number>;
// (string | number)[]  (분산 안 됨!)

// ============================================
// 3. 실전: Exclude 구현
// ============================================

type MyExclude<T, U> = T extends U ? never : T;

type Result1 = MyExclude<"a" | "b" | "c", "a">;
// "b" | "c"

// 동작 과정:
// MyExclude<"a" | "b" | "c", "a">
// → MyExclude<"a", "a"> | MyExclude<"b", "a"> | MyExclude<"c", "a">
// → never | "b" | "c"
// → "b" | "c"

// ============================================
// 4. 실전: Extract 구현
// ============================================

type MyExtract<T, U> = T extends U ? T : never;

type Result2 = MyExtract<"a" | "b" | "c", "a" | "b">;
// "a" | "b"

// ============================================
// 5. 실전: NonNullable 구현
// ============================================

type MyNonNullable<T> = T extends null | undefined ? never : T;

type Result3 = MyNonNullable<string | null | undefined>;
// string

type Result4 = MyNonNullable<number | null>;
// number
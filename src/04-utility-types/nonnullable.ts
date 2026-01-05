// src/04-utility-nonnullable.ts

// ============================================
// 기본 개념
// ============================================

type MaybeString = string | null | undefined;

// null과 undefined 제거
type DefiniteString = NonNullable<MaybeString>;
// string

const str1: DefiniteString = "hello";     // ✅ OK
// const str2: DefiniteString = null;     // ❌ 에러!
// const str3: DefiniteString = undefined; // ❌ 에러!

// ============================================
// 실전: API 응답
// ============================================

interface User {
  id: number;
  name: string;
  nickname: string | null;  // null 가능
}

function getUser(id: number): User | null {
  // 데이터베이스에서 사용자 찾기
  if (id === 1) {
    return {
      id: 1,
      name: "철수",
      nickname: "chul"
    };
  }
  return null;  // 못 찾으면 null
}

// NonNullable로 null 제거
type DefiniteUser = NonNullable<ReturnType<typeof getUser>>;
// User (null 제거됨!)

function processUser(user: DefiniteUser): void {
  // user는 절대 null이 아님!
  console.log(user.name.toUpperCase());  // 안전!
}
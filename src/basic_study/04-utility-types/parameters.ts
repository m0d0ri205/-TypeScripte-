// src/04-utility-parameters.ts

// ============================================
// 기본 개념
// ============================================

function createUser(name: string, age: number, email: string) {
  return { name, age, email };
}

// 매개변수 타입을 추출!
type CreateUserParams = Parameters<typeof createUser>;
// [string, number, string]

// 사용
const params: CreateUserParams = ["철수", 25, "chulsoo@example.com"];
const user = createUser(...params);

// ============================================
// 실전: 함수 래퍼
// ============================================

function login(email: string, password: string): boolean {
  console.log(`로그인 시도: ${email}`);
  return true;
}

// login 함수를 감싸는 함수
function withLogging(
  ...args: Parameters<typeof login>
): ReturnType<typeof login> {
  console.log("로그인 시작");
  const result = login(...args);
  console.log("로그인 완료");
  return result;
}

withLogging("user@example.com", "1234");
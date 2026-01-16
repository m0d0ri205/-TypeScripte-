// src/04-utility-omit.ts

// ============================================
// 기본 개념
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// ============================================
// Omit: 특정 속성만 빼기
// ============================================

// password를 뺀 나머지
type UserWithoutPassword = Omit<User, "password">;

const safeUser: UserWithoutPassword = {
  id: 1,
  name: "철수",
  email: "chulsoo@example.com",
  createdAt: new Date()
  // password는 없음!
};

// ============================================
// 실전: 회원가입 폼
// ============================================

// id와 createdAt는 서버에서 자동 생성
// 사용자가 입력하는 것만
type RegisterForm = Omit<User, "id" | "createdAt">;

const registerData: RegisterForm = {
  name: "신규 사용자",
  email: "newuser@example.com",
  password: "password123"
  // id, createdAt는 입력 안 함!
};

// ============================================
// 여러 개 제외하기
// ============================================

// 민감한 정보 제외
type SafeUser = Omit<User, "password" | "email">;

const displayUser: SafeUser = {
  id: 1,
  name: "철수",
  createdAt: new Date()
  // password, email 제외!
};

//##
console.log("Pick vs Omit 예시");
// ============================================
// 여러 개 제외하기
// ============================================

// 민감한 정보 제외
/*
type SafeUser = Omit<User, "password" | "email">;

const displayUser: SafeUser = {
  id: 1,
  name: "철수",
  createdAt: new Date()
  // password, email 제외!
};
*/


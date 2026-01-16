// src/04-utility-pick.ts

// ============================================
// 기본 개념
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  createdAt: Date;
}

// 사용자 전체 정보
const fullUser: User = {
  id: 1,
  name: "철수",
  email: "chulsoo@example.com",
  password: "secret123",
  age: 25,
  createdAt: new Date()
};

// ============================================
// Pick: 필요한 것만 골라내기
// ============================================

// id와 name만 필요한 경우
type UserPreview = Pick<User, "id" | "name">;

const preview: UserPreview = {
  id: 1,
  name: "철수"
  // 나머지는 필요 없음!
};

// ============================================
// 실전: API 응답
// ============================================

// 공개 프로필 (비밀번호 제외)
type PublicProfile = Pick<User, "id" | "name" | "email">;

function getPublicProfile(user: User): PublicProfile {
  return {
    id: user.id,
    name: user.name,
    email: user.email
    // password는 절대 노출 안 됨!
  };
}

const publicProfile = getPublicProfile(fullUser);
console.log(publicProfile);
// { id: 1, name: "철수", email: "chulsoo@example.com" }

// ============================================
// 로그인 폼
// ============================================

type LoginForm = Pick<User, "email" | "password">;

const loginData: LoginForm = {
  email: "user@example.com",
  password: "1234"
  // 로그인에는 이것만 필요!
};
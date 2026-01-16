// src/04-utility-required.ts

// ============================================
// 기본 개념
// ============================================

interface UserProfile {
  name: string;
  age?: number;         // Optional
  email?: string;       // Optional
  phone?: string;       // Optional
}

// 회원가입 시에는 선택 사항이 많음
const newUser: UserProfile = {
  name: "철수"
  // age, email, phone은 선택사항
};

// ============================================
// 문제: 관리자는 모든 정보가 필수!
// ============================================

// Required<UserProfile>: 모든 속성을 필수로!
function createAdmin(user: Required<UserProfile>): void {
  console.log("관리자 생성:", user);
  // 모든 정보가 있다는 것을 보장!
}

// 사용
createAdmin({
  name: "관리자",
  age: 30,
  email: "admin@example.com",
  phone: "010-1234-5678"
  // 하나라도 빠지면 에러!
});

// createAdmin({ name: "관리자" });  // ❌ 에러!
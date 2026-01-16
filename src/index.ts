// 간단한 로그인 시스템

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

// 가상의 사용자 데이터베이스
const users: User[] = [
  { id: 1, username: "admin", password: "admin123", email: "admin@example.com" },
  { id: 2, username: "user1", password: "pass123", email: "user1@example.com" },
  { id: 3, username: "user2", password: "pass456", email: "user2@example.com" },
];

// 로그인 결과 타입
type LoginResult =
  | { success: true; user: Omit<User, 'password'> }
  | { success: false; error: string };

// 로그인 함수
function login(username: string, password: string): LoginResult {
  const user = users.find(u => u.username === username);

  if (!user) {
    return { success: false, error: "사용자를 찾을 수 없습니다." };
  }

  if (user.password !== password) {
    return { success: false, error: "비밀번호가 일치하지 않습니다." };
  }

  // 비밀번호를 제외한 사용자 정보 반환
  const { password: _, ...userWithoutPassword } = user;
  return { success: true, user: userWithoutPassword };
}

// 로그인 시도 예제
console.log("=== 로그인 테스트 ===\n");

// 성공 케이스
const result1 = login("admin", "admin123");
if (result1.success) {
  console.log("✓ 로그인 성공!");
  console.log(`환영합니다, ${result1.user.username}님!`);
  console.log(`이메일: ${result1.user.email}\n`);
} else {
  console.log(`✗ 로그인 실패: ${result1.error}\n`);
}

// 실패 케이스 1: 잘못된 비밀번호
const result2 = login("user1", "wrongpassword");
if (result2.success) {
  console.log("✓ 로그인 성공!");
  console.log(`환영합니다, ${result2.user.username}님!\n`);
} else {
  console.log(`✗ 로그인 실패: ${result2.error}\n`);
}

// 실패 케이스 2: 존재하지 않는 사용자
const result3 = login("unknown", "password");
if (result3.success) {
  console.log("✓ 로그인 성공!");
  console.log(`환영합니다, ${result3.user.username}님!\n`);
} else {
  console.log(`✗ 로그인 실패: ${result3.error}\n`);
}

// 사용자 정보 조회 함수
function getUserInfo(userId: number): Omit<User, 'password'> | null {
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// 테스트
console.log("=== 사용자 정보 조회 ===\n");
const userInfo = getUserInfo(2);
if (userInfo) {
  console.log("사용자 정보:", userInfo);
}


// src/02-optional-readonly.ts

// ============================================
// 1. Optional 속성
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;        // Optional! 있어도 되고 없어도 됨
  phone?: string;      // Optional!
}

// age 없이 생성 가능
const user1: User = {
  id: 1,
  name: "김철수",
  email: "chulsoo@example.com"
  // age와 phone이 없어도 OK!
};

// age 있어도 OK
const user2: User = {
  id: 2,
  name: "이영희",
  email: "younghee@example.com",
  age: 25,
  phone: "010-1234-5678"
};

// Optional 사용할 때 주의!
function printAge(user: User): void {
  // user.age가 undefined일 수 있음!
  // console.log(user.age.toString());  // ❌ 위험!
  
  // 안전한 방법 1: if 체크
  if (user.age !== undefined) {
    console.log(`나이: ${user.age}세`);
  } else {
    console.log("나이 정보 없음");
  }
  
  // 안전한 방법 2: Optional Chaining
  console.log(user.age?.toString() ?? "나이 정보 없음");
}

printAge(user1);
printAge(user2);

// ============================================
// 2. Readonly 속성
// ============================================

interface Config {
  readonly apiUrl: string;      // 읽기 전용
  readonly apiKey: string;      // 읽기 전용
  timeout: number;              // 일반 속성
}

const config: Config = {
  apiUrl: "https://api.example.com",
  apiKey: "secret123",
  timeout: 5000
};

// 일반 속성은 변경 가능
config.timeout = 3000;  // ✅ OK

// readonly는 변경 불가!
// config.apiUrl = "https://newapi.com";  // ❌ 에러!
// config.apiKey = "newkey";              // ❌ 에러!

console.log(`API URL: ${config.apiUrl}`);
console.log(`Timeout: ${config.timeout}ms`);

// ============================================
// 3. 실전 예제: 게시글
// ============================================

interface Post {
  readonly id: number;           // ID는 변경 불가
  readonly createdAt: Date;      // 생성일은 변경 불가
  title: string;                 // 제목은 수정 가능
  content: string;               // 내용은 수정 가능
  author: string;                // 작성자는 수정 가능
  likes?: number;                // 좋아요는 Optional
  tags?: string[];               // 태그는 Optional
}

const post: Post = {
  id: 1,
  createdAt: new Date(),
  title: "TypeScript 배우기",
  content: "오늘은 interface를 배웠습니다!",
  author: "김철수"
};

// 수정 가능한 것들
post.title = "TypeScript 마스터하기";  // ✅ OK
post.content = "interface를 완벽히 이해했어요!";  // ✅ OK
post.likes = 10;  // ✅ OK (Optional이지만 추가 가능)

// 수정 불가능한 것들
// post.id = 2;  // ❌ 에러!
// post.createdAt = new Date();  // ❌ 에러!

console.log(`게시글 ${post.id}: ${post.title}`);
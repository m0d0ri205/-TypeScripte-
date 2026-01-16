// src/04-utility-partial.ts

// 기본 인터페이스
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// 사용자를 만들 때는 모든 정보가 필요
let user: User = {
  id: 1,
  name: "철수",
  email: "chulsoo@example.com",
  age: 25
  // 하나라도 빠지면 에러!
};

console.log("초기 사용자:", user); // initial user!!

// ============================================
// 문제 상황: 사용자 정보 업데이트
// ============================================

// 사용자 정보를 업데이트 하는 함수
// 모든 필드를 다 받아야 하는가??
function updateUser(id:number, updates: User): void {
  console.log(`updateUser : 사용자 ${id} 업데이트`, updates);
}

// 이름만 바꾸고 싶으면 (전부 바꿔야 함.)
updateUser(1, {
  id: 1,
  name: "김철수",
  email: "chulsoo@example.com",
  age: 25
});

// ============================================
// !! 해결책: Partial 유틸리티 타입 사용
// ============================================
// ✅ Partial<User>: User의 모든 속성을 Optional로!

function updateUserbetter(id:number, updates: Partial<User>) : void {
  console.log(`updateUserbetter : 사용자 ${id} 업데이트:`, updates);
  // 실제로 user 객체 업데이트
  user = { ...user, ...updates };
}

updateUserbetter(1, {
  name: "철수김"
})

updateUserbetter(1, {
  name: "박영희",
  age: 30
})

console.log("updateUserbetter : 최종 사용자:", user);


// ============================================
// 실전: 설정 업데이트
// ============================================
console.log("================ 실전 예제 ================");

interface AppConfig {
  theme : "light" | "dark";
  language: "ko" | "en" | "jp";
  notifications: boolean;
  autoSave: boolean;
  fontSize: number;
}

// 기본 설정
const defaultConfig: AppConfig = {
  theme: "light",
  language: "ko",
  notifications: true,
  autoSave: true,
  fontSize: 14
}

console.log("기본 설정:", defaultConfig);

// 설정 변경 함수
function updateConfig(changes: Partial<AppConfig>): void {
  console.log("변경 설정:", changes);
}


updateConfig({ theme: "dark"});
updateConfig({ fontSize: 16, autoSave: false });
updateConfig({ language: "en" });

// ## 요약 (이런 느낌임.)

// 원본
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<User>는 이렇게 변환:
interface PartialUser {
  id?: number;        // Optional!
  name?: string;      // Optional!
  email?: string;     // Optional!
  age?: number;       // Optional!
}

// PartialUser 타입 사용 예시
const partialExample: PartialUser = {
  name: "홍길동"
};
console.log("Partial 예시:", partialExample);
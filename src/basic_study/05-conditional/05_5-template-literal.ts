
// src/05-template-literal.ts

// ============================================
// 1. 기본 Template Literal Type
// ============================================

type World = "world";
type Greeting = `hello ${World}`;  // "hello world"

// ============================================
// 2. Union과 조합
// ============================================

type Color = "red" | "blue" | "green";
type Button = `${Color}-button`;
// "red-button" | "blue-button" | "green-button"

// ============================================
// 3. 이벤트 이름 만들기
// ============================================

type EventName = "click" | "focus" | "blur";
type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"

interface Events {
  onClick: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

// ============================================
// 4. HTTP 메서드 + 경로
// ============================================

type Method = "GET" | "POST" | "PUT" | "DELETE";
type Path = "/users" | "/posts" | "/comments";
type Endpoint = `${Method} ${Path}`;
// "GET /users" | "GET /posts" | ... (12가지 조합)

// ============================================
// 5. CSS 속성 만들기
// ============================================

type CSSProperty = "margin" | "padding";
type Side = "top" | "right" | "bottom" | "left";
type CSSProp = `${CSSProperty}-${Side}`;
// "margin-top" | "margin-right" | ... (8가지)

// ============================================
// 6. 실전: API 경로 타입
// ============================================

type Version = "v1" | "v2";
type Resource = "users" | "posts";
type Action = "list" | "create" | "update" | "delete";

type ApiPath = `/api/${Version}/${Resource}/${Action}`;
// "/api/v1/users/list" | "/api/v1/users/create" | ...

// ============================================
// 7. 유틸리티 타입들
// ============================================

// Uppercase
type Upper = Uppercase<"hello">;  // "HELLO"

// Lowercase
type Lower = Lowercase<"HELLO">;  // "hello"

// Capitalize (첫 글자만 대문자)
type Cap = Capitalize<"hello">;   // "Hello"

// Uncapitalize (첫 글자만 소문자)
type Uncap = Uncapitalize<"Hello">;  // "hello"

// ============================================
// 8. 실전: 타입 안전한 이벤트 시스템
// ============================================

interface Events {
  "user:login": { userId: number; timestamp: Date };
  "user:logout": { userId: number };
  "post:create": { postId: number; title: string };
}

type EventNames = keyof Events;  // "user:login" | "user:logout" | "post:create"

function emit<K extends EventNames>(
  event: K,
  data: Events[K]
): void {
  console.log(`Event: ${event}`, data);
}

// 사용 - 타입 안전!
emit("user:login", { userId: 1, timestamp: new Date() });  // ✅ OK
emit("post:create", { postId: 1, title: "Hello" });        // ✅ OK
// emit("user:login", { userId: 1 });  // ❌ 에러! timestamp 필요
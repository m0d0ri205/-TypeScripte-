// src/04-utility-extract.ts

// ============================================
// 기본 개념
// ============================================

type AllShapes = "circle" | "square" | "triangle" | "rectangle";

// "circle"과 "square"만 추출
type RoundOrSquare = Extract<AllShapes, "circle" | "square">;
// "circle" | "square"

// ============================================
// 실전: 이벤트 타입
// ============================================

type AllEvents = 
  | "click" 
  | "hover" 
  | "focus" 
  | "submit" 
  | "change";

// 마우스 이벤트만 추출
type MouseEvents = Extract<AllEvents, "click" | "hover">;
// "click" | "hover"

const event: MouseEvents = "click";  // ✅ OK
// const event2: MouseEvents = "submit";  // ❌ 에러!
// src/04-utility-exclude.ts

// ============================================
// 기본 개념
// ============================================

type AllColors = "red" | "blue" | "green" | "yellow";

// "red" 제외
type WithoutRed = Exclude<AllColors, "red">;
// "blue" | "green" | "yellow"

const color1: WithoutRed = "blue";    // ✅ OK
const color2: WithoutRed = "green";   // ✅ OK
// const color3: WithoutRed = "red";  // ❌ 에러!

// ============================================
// 여러 개 제외
// ============================================

type PrimaryColors = Exclude<AllColors, "green" | "yellow">;
// "red" | "blue"

// ============================================
// 실전: 상태 타입
// ============================================

type Status = "pending" | "success" | "error" | "cancelled";

// "cancelled" 제외한 활성 상태
type ActiveStatus = Exclude<Status, "cancelled">;

const currentStatus: ActiveStatus = "pending";  // ✅ OK
// const cancelled: ActiveStatus = "cancelled";  // ❌ 에러!
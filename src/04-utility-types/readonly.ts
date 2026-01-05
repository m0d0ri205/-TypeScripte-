// src/04-utility-readonly.ts

// ============================================
// 기본 개념
// ============================================

interface Config {
  apiUrl: string;
  timeout: number;
}

// 일반 객체: 변경 가능
const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

config.timeout = 3000;  // ✅ OK (변경 가능)

// ============================================
// Readonly: 변경 불가능!
// ============================================

const readonlyConfig: Readonly<Config> = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

// readonlyConfig.timeout = 3000;  // ❌ 에러! (읽기 전용)

console.log(readonlyConfig.timeout);  // ✅ 읽기는 OK

// ============================================
// 실전: 상수 정의
// ============================================

interface AppConstants {
  MAX_RETRY: number;
  API_VERSION: string;
  DEFAULT_TIMEOUT: number;
}

const CONSTANTS: Readonly<AppConstants> = {
  MAX_RETRY: 3,
  API_VERSION: "v1",
  DEFAULT_TIMEOUT: 5000
};

// CONSTANTS.MAX_RETRY = 5;  // ❌ 에러!
// 상수는 변경하면 안 되니까!

console.log(CONSTANTS.MAX_RETRY);  // ✅ 사용은 OK
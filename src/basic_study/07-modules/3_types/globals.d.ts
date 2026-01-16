// ============================================
// 전역 타입 선언
// ============================================
// 전역으로 사용할 수 있는 타입들 (import 없이 사용 가능)

// 전역 타입
declare global {
  // 전역 변수 타입
  interface Window {
    APP_VERSION: string;
    API_KEY: string;
  }

  // 전역 네임스페이스
  namespace App {
    interface Config {
      debug: boolean;
      apiUrl: string;
    }
  }
}

// 이 파일을 모듈로 만들기 위해 필요
export {};

// ============================================
// 유틸리티 타입들
// ============================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// ID 타입들
export type ID = string | number;
export type UUID = string;

// 날짜 타입들
export type DateString = string; // ISO 8601 형식
export type Timestamp = number;

// src/05-mapped-types.ts

// ============================================
// 1. 기본 Mapped Type
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
}

// 모든 속성을 Optional로
type PartialUser = {
  [K in keyof User]?: User[K];
};
// {
//   id?: number;
//   name?: string;
//   email?: string;
// }

// 동작 원리:
// 1. keyof User → "id" | "name" | "email"
// 2. K in "id" | "name" | "email" → K는 각각의 키
// 3. K?: User[K] → 각 키를 Optional로

// ============================================
// 2. 모든 속성을 Readonly로
// ============================================

type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};
// {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
// }

// ============================================
// 3. 제네릭 Mapped Type
// ============================================

type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// 사용
type PartialUser2 = MyPartial<User>;
type ReadonlyUser2 = MyReadonly<User>;

// ============================================
// 4. 속성 타입 변경
// ============================================

// 모든 속성을 string으로
type Stringify<T> = {
  [K in keyof T]: string;
};

type StringUser = Stringify<User>;
// {
//   id: string;
//   name: string;
//   email: string;
// }

// ============================================
// 5. 모든 속성을 Promise로
// ============================================

type Promisify<T> = {
  [K in keyof T]: Promise<T[K]>;
};

type AsyncUser = Promisify<User>;
// {
//   id: Promise<number>;
//   name: Promise<string>;
//   email: Promise<string>;
// }

// ============================================
// 6. Getter 타입 만들기
// ============================================

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }

// ============================================
// 7. 실전: 필드 검증 타입
// ============================================

type Validator<T> = {
  [K in keyof T]: (value: T[K]) => boolean;
};

type UserValidator = Validator<User>;
// {
//   id: (value: number) => boolean;
//   name: (value: string) => boolean;
//   email: (value: string) => boolean;
// }

const userValidator: UserValidator = {
  id: (value) => value > 0,
  name: (value) => value.length > 0,
  email: (value) => value.includes("@")
};

// ============================================
// 8. 선택적 속성만 추출
// ============================================

type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

interface Profile {
  id: number;
  name: string;
  age?: number;
  email?: string;
}

type OptionalProfileKeys = OptionalKeys<Profile>;  // "age" | "email"

// ============================================
// 9. 필수 속성만 추출
// ============================================

type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];

type RequiredProfileKeys = RequiredKeys<Profile>;  // "id" | "name"
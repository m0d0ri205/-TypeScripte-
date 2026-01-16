// ✅ 조건부 타입
/*
type Result = T extends U ? X : Y;

// ✅ infer (타입 추론)
type Unwrap<T> = T extends Promise<infer U> ? U : T;

// ✅ Mapped Type (타입 변환)
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// ✅ Template Literal
type Event = `on${Capitalize<string>}`;
*/
// src/05-infer.ts

// ============================================
// 1. 기본 infer - infer는 조건부 타입 안에서 타입을 "추출"할 때 사용합니다.
// ============================================

// 배열의 요소 타입 추출
type ArrayElement<T> = T extends (infer E)[] ? E : never;
//                                    ↑ E를 추론해줘!

type Arr1 = ArrayElement<string[]>;   // string
type Arr2 = ArrayElement<number[]>;   // number
type Arr3 = ArrayElement<boolean[]>;  // boolean
type Arr4 = ArrayElement<string>;     // never (배열 아님)

// 동작 원리:
// ArrayElement<string[]> 실행:
// 1. string[] extends (infer E)[]? 
// 2. E = string으로 추론됨
// 3. 조건 참이므로 E 반환
// 4. 결과: string

// ============================================
// 2. 함수 반환 타입 추출
// ============================================

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
//                                                   ↑ 반환 타입을 R로 추론

type Func1 = () => string;
type Return1 = MyReturnType<Func1>;  // string

type Func2 = (x: number) => boolean;
type Return2 = MyReturnType<Func2>;  // boolean

type Func3 = () => { id: number; name: string };
type Return3 = MyReturnType<Func3>;  // { id: number; name: string }

// ============================================
// 3. 함수 매개변수 타입 추출
// ============================================

type MyParameters<T> = T extends (...args: infer P) => any ? P : never;
//                                         ↑ 매개변수를 P로 추론

type Func4 = (name: string, age: number) => void;
type Params1 = MyParameters<Func4>;  // [string, number]

type Func5 = (user: { id: number; name: string }) => void;
type Params2 = MyParameters<Func5>;  // [{ id: number; name: string }]

// ============================================
// 4. Promise 언래핑
// ============================================

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
//                                        ↑ Promise 안의 타입 추론

type Prom1 = UnwrapPromise<Promise<string>>;  // string
type Prom2 = UnwrapPromise<Promise<number>>;  // number
type Prom3 = UnwrapPromise<string>;           // string (Promise 아님)

// ============================================
// 5. 실전: 깊은 Promise 언래핑
// ============================================

type DeepUnwrapPromise<T> = T extends Promise<infer U>
  ? DeepUnwrapPromise<U>  // 재귀적으로 언래핑
  : T;

type Deep1 = DeepUnwrapPromise<Promise<Promise<string>>>;  // string
type Deep2 = DeepUnwrapPromise<Promise<Promise<Promise<number>>>>;  // number

// ============================================
// 6. 첫 번째 매개변수 추출
// ============================================

type FirstParameter<T> = T extends (first: infer F, ...args: any[]) => any 
  ? F 
  : never;

type Func6 = (name: string, age: number, email: string) => void;
type First1 = FirstParameter<Func6>;  // string

type Func7 = (id: number) => void;
type First2 = FirstParameter<Func7>;  // number

// ============================================
// 7. 마지막 배열 요소 타입 추출
// ============================================

type LastArrayElement<T> = T extends [...any[], infer L] ? L : never;

type Last1 = LastArrayElement<[string, number, boolean]>;  // boolean
type Last2 = LastArrayElement<[1, 2, 3, 4, 5]>;            // 5
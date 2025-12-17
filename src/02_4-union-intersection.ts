
// src/02-union-intersection.ts

// ============================================
// 1. Union 타입 - A 또는 B
// ============================================

// 문자열 또는 숫자
type StringOrNumber = string | number;

let value1: StringOrNumber = "hello";  // ✅ OK
let value2: StringOrNumber = 123;      // ✅ OK
// let value3: StringOrNumber = true;  // ❌ 에러!

// 함수에서 사용
function printId(id: string | number): void {
  console.log(`ID: ${id}`);
}

printId("user-123");  // ✅ 문자열
printId(456);         // ✅ 숫자

// ============================================
// 2. Union으로 여러 타입 조합
// ============================================

type Admin = {
  role: "admin";
  permissions: string[];
};

type User = {
  role: "user";
  subscription: "free" | "premium";
};

type Guest = {
  role: "guest";
  accessLevel: "limited";
};

// Admin 또는 User 또는 Guest!
type Person = Admin | User | Guest;

const admin: Person = {
  role: "admin",
  permissions: ["read", "write", "delete"]
};

const user: Person = {
  role: "user",
  subscription: "premium"
};

const guest: Person = {
  role: "guest",
  accessLevel: "limited"
};

// Union 타입 구분하기 (Type Guard)
function printRole(person: Person): void {
  if (person.role === "admin") {
    // TypeScript가 Admin 타입인 걸 앎!
    console.log(`관리자 권한: ${person.permissions.join(", ")}`);
  } else if (person.role === "user") {
    // User 타입!
    console.log(`사용자 구독: ${person.subscription}`);
  } else {
    // Guest 타입!
    console.log(`게스트 접근: ${person.accessLevel}`);
  }
}

printRole(admin);
printRole(user);
printRole(guest);

// ============================================
// 3. Intersection (&) - A이면서 B
// ============================================

type HasName = {
  name: string;
};

type HasAge = {
  age: number;
};

// name도 있고 age도 있는 타입!
type Person2 = HasName & HasAge;

const person: Person2 = {
  name: "김철수",
  age: 25
  // 둘 다 필수!
};

// ============================================
// 4. 실전 예제: API 요청/응답
// ============================================

type BaseResponse = {
  success: boolean;
  timestamp: Date;
};

type UserData = {
  id: number;
  name: string;
  email: string;
};

type ErrorData = {
  code: number;
  message: string;
};

// BaseResponse + UserData
type UserResponse = BaseResponse & {
  data: UserData;
};

// BaseResponse + ErrorData
type ErrorResponse = BaseResponse & {
  error: ErrorData;
};

// 성공 또는 실패
type ApiResponse = UserResponse | ErrorResponse;

function handleApiResponse(response: ApiResponse): void {
  console.log(`요청 시간: ${response.timestamp}`);
  
  if (response.success) {
    // UserResponse 타입
    const userResponse = response as UserResponse;
    console.log(`사용자: ${userResponse.data.name}`);
  } else {
    // ErrorResponse 타입
    const errorResponse = response as ErrorResponse;
    console.log(`에러: ${errorResponse.error.message}`);
  }
}
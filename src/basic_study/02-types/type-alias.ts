
// ============================================
// 1. 기본 타입에도 별칭 가능
// ============================================


type UserId = number;
type Email = string;
type Password = string;

let userId: UserId = 12345;
let email: Email = "user@example.com";
let password: Password = "secret123";

// 가독성이 좋아짐!
function findUser(id: UserId): void {
  console.log(`사용자 ${id} 검색 중...`);
}

// ============================================
// 2. Union 타입 (이게 중요!)
// ============================================

// "성공" 또는 "실패" 또는 "대기중"
type Status = "success" | "failure" | "pending";

let currentStatus: Status = "success";
currentStatus = "pending";  // ✅ OK
// currentStatus = "완료";  // ❌ 에러! 정의된 값만 가능

// 숫자나 문자열
type StringOrNumber = string | number;

let value: StringOrNumber;
value = "hello";  // ✅ OK
value = 123;      // ✅ OK
// value = true;  // ❌ 에러!

// ============================================
// 3. 실전 예제: API 응답 타입
// ============================================

type SuccessResponse = {
  success: true;
  data: {
    id: number;
    name: string;
  };
};

type ErrorResponse = {
  success: false;
  error: {
    code: number;
    message: string;
  };
};

// 성공 또는 실패 둘 중 하나!
type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse): void {
  if (response.success) {
    // TypeScript가 자동으로 SuccessResponse인 걸 앎!
    console.log(`데이터: ${response.data.name}`);
  } else {
    // 여기선 ErrorResponse!
    console.log(`에러: ${response.error.message}`);
  }
}

// 사용
const success: ApiResponse = {
  success: true,
  data: { id: 1, name: "철수" }
};

const failure: ApiResponse = {
  success: false,
  error: { code: 404, message: "사용자를 찾을 수 없습니다" }
};

handleResponse(success);
handleResponse(failure);

// ============================================
// 4. 복잡한 타입 조합
// ============================================

type Role = "admin" | "user" | "guest";
type Permission = "read" | "write" | "delete";

type User = {
  id: number;
  name: string;
  role: Role;  // type을 type 안에서 사용!
  permissions: Permission[];
};

const admin: User = {
  id: 1,
  name: "관리자",
  role: "admin",
  permissions: ["read", "write", "delete"]
};

const normalUser: User = {
  id: 2,
  name: "일반 사용자",
  role: "user",
  permissions: ["read", "write"]
};
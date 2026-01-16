// ============================================
// 1. interface의 특징: extends로 확장
// ============================================

interface Animal {
  name: string;
  age: number;
}

// interface는 extends로 확장
interface Dog extends Animal {
  breed: string;  // 추가 속성
}

const myDog: Dog = {
  name: "멍멍이",
  age: 3,
  breed: "진돗개"
};

// ============================================
// 2. type의 특징: &로 확장
// ============================================

type Animal2 = {
  name: string;
  age: number;
};

// type은 & (intersection)로 확장
type Cat = Animal2 & {
  color: string;
};

const myCat: Cat = {
  name: "야옹이",
  age: 2,
  color: "흰색"
};

// ============================================
// 3. interface만 가능: Declaration Merging
// ============================================

// 같은 이름의 interface를 여러 번 선언하면 합쳐짐!
interface User {
  name: string;
}

interface User {
  age: number;
}

interface User {
  email: string;
}

// 위 3개가 합쳐져서:
// interface User {
//   name: string;
//   age: number;
//   email: string;
// }

const user: User = {
  name: "철수",
  age: 25,
  email: "chulsoo@example.com"
  // 3개 속성 모두 필요!
};

// type은 불가능!
// type User2 = { name: string; };
// type User2 = { age: number; };  // ❌ 에러! 중복 선언 불가

// ============================================
// 4. type만 가능: Union
// ============================================

// interface는 Union 불가!
// interface StringOrNumber = string | number;  // ❌ 불가능!

// type은 Union 가능!
type StringOrNumber = string | number;  // ✅ OK

// ============================================
// 5. type만 가능: Primitive 별칭
// ============================================

// interface는 객체 타입만 가능
// interface ID = number;  // ❌ 불가능!

// type은 뭐든 가능
type ID = number;  // ✅ OK
type Status = "active" | "inactive";  // ✅ OK

// ============================================
// 6. 실전 가이드: 언제 뭘 쓸까?
// ============================================

// ✅ interface 사용 권장:
// - 객체 구조 정의
// - 클래스 구현 (나중에 배움)
// - 확장 가능성이 있는 타입

interface UserProfile {
  id: number;
  username: string;
  email: string;
}

// ✅ type 사용 권장:
// - Union이 필요할 때
// - Intersection이 필요할 때
// - Primitive 타입 별칭
// - 복잡한 타입 조합

// type Role = "admin" | "user" | "guest";
// type ID2 = string | number;
// type ApiResponse2 = SuccessResponse | ErrorResponse;

// 둘 다 가능한 경우: 취향 차이
// 하지만 일관성 유지가 중요!
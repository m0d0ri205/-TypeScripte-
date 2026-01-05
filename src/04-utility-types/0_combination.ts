// src/04_4-utility-combination.ts

// ============================================
// 유틸리티 타입 조합 - 실전 예시
// ============================================

// 기본 User 인터페이스
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  lastLogin?: Date;
}

// ============================================
// 1. Partial + Readonly
// "일부만 수정 가능하지만, 수정된 값은 읽기 전용"
// ============================================

// 사용자 업데이트 API에서 받은 데이터를 읽기 전용으로 저장
type UpdateResult = Readonly<Partial<User>>;

const updateResult: UpdateResult = {
  name: "새 이름",
  email: "new@email.com"
};

// updateResult.name = "다시 변경";  // ❌ 에러! Readonly
// 업데이트 결과는 변경하면 안 되니까!

// ============================================
// 2. Omit + Readonly
// "특정 필드를 제외하고, 읽기 전용으로"
// ============================================

// 비밀번호를 제외한 사용자 정보 (클라이언트에 보낼 데이터)
type UserResponse = Readonly<Omit<User, 'password'>>;

const userResponse: UserResponse = {
  id: 1,
  name: "홍길동",
  email: "hong@email.com",
  role: "user",
  createdAt: new Date(),
  lastLogin: new Date()
};

// userResponse.email = "hack@evil.com";  // ❌ 에러! Readonly
// 클라이언트에 보낸 데이터는 변경하면 안 되니까!

// ============================================
// 3. Pick + Required
// "특정 필드만 선택하고, 모두 필수로"
// ============================================

// 로그인 폼: id, email, password만 필요하고 모두 필수
type LoginForm = Required<Pick<User, 'email' | 'password'>>;

const loginForm: LoginForm = {
  email: "user@email.com",
  password: "secret123"
  // lastLogin이 optional이었어도, 여기선 필요 없음!
};

// ============================================
// 4. Omit + Partial + Readonly (3중 조합!)
// "특정 필드 제외, 일부만 있어도 되고, 읽기 전용"
// ============================================

// 사용자 검색 조건: id와 password는 제외, 나머지는 선택적, 읽기 전용
type UserSearchCriteria = Readonly<Partial<Omit<User, 'id' | 'password'>>>;

const searchCriteria: UserSearchCriteria = {
  role: "admin"
  // name, email 등은 없어도 됨 (Partial)
  // id, password는 검색 조건에서 제외 (Omit)
};

// searchCriteria.role = "user";  // ❌ 에러! Readonly
// 검색 조건은 한번 정하면 변경하면 안 되니까!

// ============================================
// 5. 실전 예시: API 레이어
// ============================================

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

// 1) 상품 생성 요청: id, 날짜 필드 제외, 나머지 필수
type CreateProductRequest = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

const createRequest: CreateProductRequest = {
  name: "새 상품",
  price: 10000,
  description: "설명",
  stock: 100
  // id, createdAt, updatedAt는 서버에서 자동 생성!
};

// 2) 상품 수정 요청: id 필수, 나머지는 선택적
type UpdateProductRequest = { id: string } & Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>;

const updateRequest: UpdateProductRequest = {
  id: "product-123",
  price: 12000  // 가격만 수정
  // name, description, stock은 선택적
};

// 3) 상품 응답: 모든 필드 읽기 전용
type ProductResponse = Readonly<Product>;

const productResponse: ProductResponse = {
  id: "product-123",
  name: "상품명",
  price: 10000,
  description: "설명",
  stock: 100,
  createdAt: new Date(),
  updatedAt: new Date()
};

// productResponse.price = 5000;  // ❌ 에러! Readonly
// API 응답은 변경하면 안 되니까!

// ============================================
// 6. 커스텀 유틸리티 타입 만들기
// ============================================

// 자주 사용하는 조합을 커스텀 타입으로!
type ImmutablePartial<T> = Readonly<Partial<T>>;
type WithoutSensitiveData<T> = Readonly<Omit<T, 'password' | 'id'>>;

// 사용 예시
type UserUpdate = ImmutablePartial<User>;
type SafeUser = WithoutSensitiveData<User>;

const userUpdate: UserUpdate = {
  name: "새 이름"
};

const safeUser: SafeUser = {
  name: "홍길동",
  email: "hong@email.com",
  role: "user",
  createdAt: new Date()
  // password, id는 제외됨!
};

// ============================================
// 실용성 정리
// ============================================

/*
✅ 실무에서 자주 사용하는 조합:

1. Readonly<Omit<T, 'sensitive'>>
   → API 응답에서 민감한 정보 제외하고 읽기 전용

2. Partial<Pick<T, 'fields'>>
   → 업데이트 요청에서 특정 필드만 선택적으로

3. Required<Pick<T, 'fields'>>
   → 폼 데이터에서 특정 필드만 필수로

4. Readonly<Partial<Omit<T, 'auto'>>>
   → 검색/필터 조건 (자동 생성 필드 제외, 선택적, 읽기 전용)

복잡해 보이지만, 실제로는:
- 타입 안정성 ↑
- 버그 감소 ↓
- 코드 의도 명확 ↑
- 리팩토링 쉬워짐 ↑

결론: 복잡해 보여도 실용성 있음! 🎯
*/

export {};
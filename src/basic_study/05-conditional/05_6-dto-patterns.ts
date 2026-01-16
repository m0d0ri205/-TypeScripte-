// src/05-dto-patterns.ts

// ============================================
// 1. 기본 Entity
// ============================================

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// 2. 생성 DTO (id, 날짜 제외)
// ============================================

type CreateUserDto = Omit<User, "id" | "createdAt" | "updatedAt">;
// {
//   email: string;
//   password: string;
//   name: string;
// }

// ============================================
// 3. 업데이트 DTO (일부만)
// ============================================

type UpdateUserDto = Partial<Omit<User, "id" | "createdAt">>;
// {
//   email?: string;
//   password?: string;
//   name?: string;
//   updatedAt?: Date;
// }

// ============================================
// 4. 응답 DTO (password 제외)
// ============================================

type UserResponseDto = Omit<User, "password">;
// {
//   id: number;
//   email: string;
//   name: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// ============================================
// 5. 자동 DTO 생성기
// ============================================

// 생성 DTO 자동 생성
type CreateDto<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

// 업데이트 DTO 자동 생성
type UpdateDto<T> = Partial<Omit<T, "id" | "createdAt">>;

// 응답 DTO 자동 생성 (password 제외)
type ResponseDto<T> = Omit<T, "password">;

// 사용
type UserCreate = CreateDto<User>;
type UserUpdate = UpdateDto<User>;
type UserResponse = ResponseDto<User>;

// ============================================
// 6. 실전 함수
// ============================================

function createUser(data: CreateDto<User>): ResponseDto<User> {
  const user: User = {
    id: Math.random(),  // 실제론 DB에서 생성
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  // password 제외하고 반환
  const { password, ...response } = user;
  return response;
}

function updateUser(
  id: number,
  data: UpdateDto<User>
): ResponseDto<User> {
  // 업데이트 로직
  console.log(`User ${id} updated`, data);
  
  // 실제론 DB에서 가져온 데이터
  return {
    id,
    email: "updated@example.com",
    name: "Updated Name",
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

// 사용
const newUser = createUser({
  email: "user@example.com",
  password: "secret123",
  name: "철수"
});

const updated = updateUser(1, {
  name: "김철수"  // 이름만 변경
});
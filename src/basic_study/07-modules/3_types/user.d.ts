// ============================================
// User 관련 타입 정의
// ============================================
// .d.ts 파일: 타입만 정의 (구현 코드 없음)

export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  role: UserRole;
  createdAt: Date;
}

export type UserRole = "admin" | "user" | "guest";

export interface UserProfile extends User {
  bio: string;
  avatar?: string;
  followers: number;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
}

export type UserWithoutPassword = Omit<User, "password">;
export type PartialUser = Partial<User>;
export type ReadonlyUser = Readonly<User>;

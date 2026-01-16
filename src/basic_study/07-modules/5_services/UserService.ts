// ============================================
// UserService (사용자 비즈니스 로직)
// ============================================

import { User } from "../4_models/User.js";
import type { UserRole, CreateUserDto, UpdateUserDto } from "../3_types/user.js";

export class UserService {
  private users: Map<number, User>;
  private nextId: number;

  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  // 사용자 생성
  createUser(dto: CreateUserDto): User {
    const user = new User(
      this.nextId++,
      dto.name,
      dto.email,
      "user"
    );

    this.users.set(user.id, user);
    console.log(`✅ User created: ${user.getInfo()}`);
    return user;
  }

  // 관리자 생성
  createAdmin(name: string, email: string): User {
    const admin = User.createAdmin(this.nextId++, name, email);
    this.users.set(admin.id, admin);
    console.log(`✅ Admin created: ${admin.getInfo()}`);
    return admin;
  }

  // 사용자 조회
  getUserById(id: number): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  // 역할별 조회
  getUsersByRole(role: UserRole): User[] {
    return this.getAllUsers().filter((user) => user.role === role);
  }

  getAdmins(): User[] {
    return this.getUsersByRole("admin");
  }

  // 사용자 수정
  updateUser(id: number, dto: UpdateUserDto): User {
    const user = this.users.get(id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    if (dto.name) user.name = dto.name;
    if (dto.email) user.updateEmail(dto.email);
    if (dto.age !== undefined) user.age = dto.age;

    console.log(`✅ User updated: ${user.getInfo()}`);
    return user;
  }

  // 사용자 삭제
  deleteUser(id: number): boolean {
    const deleted = this.users.delete(id);
    if (deleted) {
      console.log(`✅ User deleted: ${id}`);
    } else {
      console.log(`❌ User not found: ${id}`);
    }
    return deleted;
  }

  // 역할 변경
  changeRole(id: number, newRole: UserRole): User {
    const user = this.users.get(id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    const oldRole = user.role;
    user.role = newRole;
    console.log(`✅ User role changed: ${user.name} (${oldRole} → ${newRole})`);
    return user;
  }

  // 통계
  getUserCount(): number {
    return this.users.size;
  }

  getStats() {
    const users = this.getAllUsers();
    return {
      total: users.length,
      admins: users.filter((u) => u.role === "admin").length,
      regularUsers: users.filter((u) => u.role === "user").length,
      guests: users.filter((u) => u.role === "guest").length,
    };
  }

  // 검색
  searchUsers(keyword: string): User[] {
    const lowerKeyword = keyword.toLowerCase();
    return this.getAllUsers().filter(
      (user) =>
        user.name.toLowerCase().includes(lowerKeyword) ||
        user.email.toLowerCase().includes(lowerKeyword)
    );
  }

  // 초기화
  clear(): void {
    this.users.clear();
    this.nextId = 1;
    console.log("✅ All users cleared");
  }
}

// 싱글톤 패턴 예시 (선택사항)
export class UserServiceSingleton {
  private static instance: UserService;

  private constructor() {}

  static getInstance(): UserService {
    if (!UserServiceSingleton.instance) {
      UserServiceSingleton.instance = new UserService();
    }
    return UserServiceSingleton.instance;
  }
}

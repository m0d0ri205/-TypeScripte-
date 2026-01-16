// ============================================
// User Model (사용자 모델)
// ============================================

import type { User as IUser, UserRole } from "../3_types/user.js";

export class User implements IUser {
  id: number;
  name: string;
  email: string;
  age?: number;
  role: UserRole;
  createdAt: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    role: UserRole = "user",
    age?: number
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.age = age;
    this.createdAt = new Date();
  }

  // 메서드들
  getInfo(): string {
    return `${this.name} (${this.email}) - ${this.role}`;
  }

  isAdmin(): boolean {
    return this.role === "admin";
  }

  updateEmail(newEmail: string): void {
    if (this.validateEmail(newEmail)) {
      this.email = newEmail;
    } else {
      throw new Error("Invalid email format");
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 정적 메서드
  static createAdmin(id: number, name: string, email: string): User {
    return new User(id, name, email, "admin");
  }

  static createGuest(): User {
    return new User(0, "Guest", "guest@example.com", "guest");
  }

  // JSON 변환
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      role: this.role,
      createdAt: this.createdAt.toISOString(),
    };
  }

  static fromJSON(json: any): User {
    const user = new User(json.id, json.name, json.email, json.role, json.age);
    user.createdAt = new Date(json.createdAt);
    return user;
  }
}

// 추가 타입 export
export type { UserRole } from "../3_types/user.js";

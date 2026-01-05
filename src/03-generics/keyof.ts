// ============================================
// 1. keyof 기본
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// keyof User = "id" | "name" | "email" | "age"
type UserKeys = keyof User;

const key1: UserKeys = "id";       // ✅ OK
const key2: UserKeys = "name";     // ✅ OK
// const key3: UserKeys = "phone";  // ❌ 에러! User에 없는 키

// ============================================
// 2. 객체 속성 안전하게 가져오기
// ============================================

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = {
  id: 1,
  name: "철수",
  email: "chulsoo@example.com",
  age: 25
};

const userName = getProperty(user, "name");    // 타입: string
const userAge = getProperty(user, "age");      // 타입: number
// const userPhone = getProperty(user, "phone");  // ❌ 에러!

console.log(userName);  // "철수"
console.log(userAge);   // 25

// ============================================
// 3. 객체 속성 안전하게 설정하기
// ============================================

function setProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): void {
  obj[key] = value;
}

setProperty(user, "name", "김철수");    // ✅ OK
setProperty(user, "age", 26);          // ✅ OK
// setProperty(user, "age", "26");      // ❌ 에러! age는 number여야 함
// setProperty(user, "phone", "010");   // ❌ 에러! phone 속성 없음

console.log(user.name);  // "김철수"
console.log(user.age);   // 26

// ============================================
// 4. 실전 예제: 객체 업데이트
// ============================================

function updateUser<K extends keyof User>(
  user: User,
  updates: Pick<User, K>
): User {
  return { ...user, ...updates };
}

const updatedUser = updateUser(user, {
  name: "박철수",
  age: 27
});

console.log(updatedUser);
// { id: 1, name: "박철수", email: "chulsoo@example.com", age: 27 }

// ============================================
// 5. 객체 키 순회
// ============================================

function printObject<T extends object>(obj: T): void {
  for (const key in obj) {
    console.log(`${key}: ${obj[key]}`);
  }
}

printObject(user);
// id: 1
// name: 박철수
// email: chulsoo@example.com
// age: 27

// ============================================
// 6. 부분 객체 만들기
// ============================================

function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

const userNameAndEmail = pick(user, ["name", "email"]);
console.log(userNameAndEmail);
// { name: "박철수", email: "chulsoo@example.com" }

// 타입: { name: string; email: string; }
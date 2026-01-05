// ============================================
// 1. 문제 상황
// ============================================

// 이 함수는 모든 타입을 받을 수 있어요
function logLength<T>(value: T): void {
  // console.log(value.length);  // ❌ 에러!
  // T가 length를 가지고 있다는 보장이 없음!
}

// ============================================
// 2. 해결: extends로 제약 추가
// ============================================

// T는 반드시 length 속성을 가져야 함!
interface HasLength {
  length: number;
}

function logLength2<T extends HasLength>(value: T): void {
  console.log(`길이: ${value.length}`);  // ✅ OK!
}

// 사용 가능한 타입들
logLength2("hello");           // string은 length 있음
logLength2([1, 2, 3]);        // 배열도 length 있음
logLength2({ length: 10 });   // 객체도 length 있으면 OK

// logLength2(123);            // ❌ 에러! number는 length 없음
// logLength2(true);           // ❌ 에러! boolean도 length 없음

// ============================================
// 3. 실전 예제: ID가 있는 객체만
// ============================================

interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// 사용자 타입
interface User extends HasId {
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "철수", email: "chulsoo@example.com" },
  { id: 2, name: "영희", email: "younghee@example.com" }
];

const user = findById(users, 1);
console.log(user?.name);  // "철수"

// 상품 타입
interface Product extends HasId {
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 101, name: "노트북", price: 1500000 },
  { id: 102, name: "마우스", price: 25000 }
];

const product = findById(products, 101);
console.log(product?.name);  // "노트북"

// ============================================
// 4. 여러 제약 동시 사용
// ============================================

interface Nameable {
  name: string;
}

interface Sortable {
  priority: number;
}

// T는 Nameable과 Sortable 둘 다 만족해야 함!
function sortByPriority<T extends Nameable & Sortable>(items: T[]): T[] {
  return items.sort((a, b) => a.priority - b.priority);
}

interface Task extends Nameable, Sortable {
  id: number;
  completed: boolean;
}

const tasks: Task[] = [
  { id: 1, name: "코딩", priority: 3, completed: false },
  { id: 2, name: "식사", priority: 1, completed: false },
  { id: 3, name: "운동", priority: 2, completed: false }
];

const sortedTasks = sortByPriority(tasks);
console.log(sortedTasks.map(t => t.name));  // ["식사", "운동", "코딩"]

// ============================================
// 5. 특정 타입의 서브타입만
// ============================================

// T는 반드시 number의 서브타입이어야 함
function double<T extends number>(value: T): number {
  return value * 2;
}

console.log(double(5));      // 10
console.log(double(3.14));   // 6.28
// console.log(double("5"));  // ❌ 에러! string은 number의 서브타입 아님

// ============================================
// 6. 생성자 함수 제약
// ============================================

// new (...args: any[]) => T 는 "생성자 함수" 타입
function create<T>(Constructor: new () => T): T {
  return new Constructor();
}

class User2 {
  name: string = "기본 이름";
  greet() {
    console.log(`안녕, ${this.name}!`);
  }
}

const user2 = create(User2);
user2.greet();  // "안녕, 기본 이름!"
// ============================================
// 1. 기본 제네릭 인터페이스
// ============================================

interface Box<T> {
  value: T;
}

// 숫자 박스
const numberBox: Box<number> = {
  value: 123
};

// 문자열 박스
const stringBox: Box<string> = {
  value: "hello"
};

// 객체 박스
const userBox: Box<{ name: string; age: number }> = {
  value: { name: "철수", age: 25 }
};

console.log(numberBox.value);      // 123
console.log(stringBox.value);      // "hello"
console.log(userBox.value.name);   // "철수"

// ============================================
// 2. 실전 예제: Key-Value 쌍
// ============================================

interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair1: KeyValuePair<string, number> = {
  key: "age",
  value: 25
};

const pair2: KeyValuePair<number, string> = {
  key: 1,
  value: "첫 번째"
};

const pair3: KeyValuePair<string, boolean> = {
  key: "isActive",
  value: true
};

console.log(`${pair1.key}: ${pair1.value}`);  // "age: 25"


// ============================================
// 3. 제네릭 배열 인터페이스
// ============================================

interface List<T> {
  items: T[];
  add(item: T): void;
  get(index: number): T | undefined;
  size(): number;
}

// 숫자 리스트 구현
const numberList: List<number> = {
  items: [],
  add(item: number) {
    this.items.push(item);
  },
  get(index: number) {
    return this.items[index];
  },
  size() {
    return this.items.length;
  }
};

numberList.add(10);
numberList.add(20);
numberList.add(30);

console.log(numberList.get(0));   // 10
console.log(numberList.size());   // 3

// ============================================
// 4. API 응답 인터페이스
// ============================================

interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: Date;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

// 사용자 응답
const userResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: 1,
    name: "철수",
    email: "chulsoo@example.com"
  },
  timestamp: new Date()
};

// 상품 응답
const productResponse: ApiResponse<Product> = {
  success: true,
  data: {
    id: 101,
    name: "노트북",
    price: 1500000
  },
  timestamp: new Date()
};

// 배열 응답
const productsResponse: ApiResponse<Product[]> = {
  success: true,
  data: [
    { id: 101, name: "노트북", price: 1500000 },
    { id: 102, name: "마우스", price: 25000 }
  ],
  timestamp: new Date()
};

console.log(userResponse.data.name);          // "철수"
console.log(productResponse.data.price);      // 1500000
console.log(productsResponse.data.length);    // 2

// ============================================
// 5. 페이지네이션 응답
// ============================================

interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}

const userPage: PaginatedResponse<User> = {
  data: [
    { id: 1, name: "철수", email: "chulsoo@example.com" },
    { id: 2, name: "영희", email: "younghee@example.com" }
  ],
  page: 1,
  pageSize: 10,
  total: 25,
  hasNext: true
};

console.log(`페이지 ${userPage.page}, 총 ${userPage.total}명`);
console.log(`다음 페이지: ${userPage.hasNext ? "있음" : "없음"}`);
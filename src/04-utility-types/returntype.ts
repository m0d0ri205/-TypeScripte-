// src/04-utility-returntype.ts

// ============================================
// 기본 개념
// ============================================

function getUser() {
  return {
    id: 1,
    name: "철수",
    email: "chulsoo@example.com"
  };
}

// 함수의 반환 타입을 추출!
type User = ReturnType<typeof getUser>;
// { id: number; name: string; email: string; }

const user: User = {
  id: 2,
  name: "영희",
  email: "younghee@example.com"
};

// ============================================
// 실전: API 함수
// ============================================

function fetchProducts() {
  return [
    { id: 1, name: "노트북", price: 1500000 },
    { id: 2, name: "마우스", price: 25000 }
  ];
}

// 반환 타입 자동 추출!
type Products = ReturnType<typeof fetchProducts>;
// { id: number; name: string; price: number; }[]

type Product = Products[number];
// { id: number; name: string; price: number; }

const product: Product = {
  id: 3,
  name: "키보드",
  price: 80000
};
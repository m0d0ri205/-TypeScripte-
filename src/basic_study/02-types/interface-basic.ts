
// ❌ 불편한 방법 (어제)
// 어제 배운 객체 타입
let user : {
    name : string;
    age : number;
    email : string;
} = {
    name : "m0d0ri205",
    age : 22,
    email : "koguma1234@gmail.com"
};

// 또 다른 사용자를 만들려면?
let user2: {
  name: string;  // 똑같은 타입을 또 써야 함!
  age: number;
  email: string;
} = {
  name: "이영희",
  age: 23,
  email: "younghee@example.com"
};

// -> interface를 사용하면?
interface User {
    name : string;
    age : number;
    email : string;
}

// 재사용 가능!
let user_1: User = {
  name: "김철수",
  age: 25,
  email: "chulsoo@example.com"
};

let user_2: User = {
  name: "이영희",
  age: 23,
  email: "younghee@example.com"
};

function printUser(user: User): void {
  console.log(`${user.name} (${user.age}세)`);
}

printUser(user_1);
printUser(user_2);
console.log("-----------0. interface test------------");


// ============================================
// 1. 인터페이스 선언 (interface)
// ============================================

interface Product {
    id : number;
    name : string;
    price : number;
    category : string;
}

const laptop : Product = {
    id : 1,
    name : "맥북 프로",
    price : 1500000,
    category : "전자제품"
}

const phone: Product = {
  id: 2,
  name: "아이폰 15",
  price: 1300000,
  category: "전자제품"
};


// ============================================
// 2. 함수에서 interface 사용
// ============================================

interface LoginRequest {
    email : string;
    password : string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  message: string;
}

function login(request : LoginRequest) : LoginResponse {

    // 실제로는 데이터베이스 확인
    if (request.email === "user@example.com" && request.password === "1234") {
        return {
        success: true,
        token: "abc123xyz",
        message: "로그인 성공!"
        };
    }

    return {
        success: false,
        token: "",
        message: "이메일 또는 비밀번호가 틀렸습니다."
    };
}

// 사용
const loginData: LoginRequest = {
    email: "user@example.com",
    password: "1234"
};

const result = login(loginData);
console.log(result.message);
console.log(result.token);

// ============================================
// 3. 중첩된 interface
// ============================================

interface Address {
    city : string;
    street : string;
    zipCode : string;
}

interface Company {
    name : string;
    address : Address; // 중첩된 interface
    employees : number;
}

const myCompany : Company = {
    name : "감자 고구마 농장",
    address : {
        city : "서울",
        street : "강남대로 1234",
        zipCode : "06000"
    },
    employees : 50
};

// console.log('회사 : ${myCompany.name}, \n 위치: ${myCompany.address.city}');
// 이게 인식이 안되네

console.log(`회사: ${myCompany.name}`);
console.log(`위치: ${myCompany.address.city}`);

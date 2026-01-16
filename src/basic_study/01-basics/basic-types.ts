
// ============================================
//## 코드 실행
// # TypeScript 컴파일 (감시 모드)
// npm run dev

// # 다른 터미널에서 실행
// node dist/01-basic-types.js
// node dist/01-practice.js
// ============================================


// ============================================
// 1. 기본 타입 (Primitive Types)
// ============================================

// string - 문자열
let username : string = "m0d0ri205";
let mail : string = 'koguma1234@gmail.com';
let message : string = `안녕하세요, ${username}! 당신의 이메일은 ${mail}입니다.`;

// number - 숫자 (정수, 소수 구분 없음)
let age : number = 22;
let height : number = 123.4;
let temperature : number = -11;

// boolean - 참/거짓
let isActive: boolean = true;
let hasPermission: boolean = false;


// ============================================
// 2. 배열 타입
// // ============================================

// 방법 1: 타입[]
let numbers : number[] = [1,2,3,4,5];
let names: string[] = ["감자", "고구마", "옥수수"];


// 방법 2: Array<타입>
let scores: Array<number> = [90, 85, 88];
let cities: Array<string> = ["서울", "부산", "대구"];

// 혼합 타입은 불가능! (에러 발생)
// let mixed: number[] = [1, "two", 3]; // ❌ 에러!

// ============================================
// 3. 객체 타입
// ============================================


// 기본 객체 타입 정의
let user : {
    name : string;
    age : number;
    isAdmin : boolean;
} = {
    name : "m0d0ri205",
    age : 22,
    isAdmin : true
};

// 중첩 객체
let product : {
    id: number;
    name: string;
    price: {
        original: number;
        discount: number;
    };
} = {
    id: 1,
    name: "노트북",
    price: {
        original: 1500000,
        discount: 1350000
  }
};

// ============================================
// 4. any 타입 (가능하면 피하세요!)
// ============================================

let anything: any = "문자열";
anything = 123;        // OK
anything = true;       // OK
anything = [1, 2, 3]; // OK
// any는 타입 체크를 무력화시킵니다! 🚫


// ============================================
// 5. unknown 타입 (any보다 안전)
// ============================================

let userInput: unknown;
userInput = "hello";
userInput = 123;

// unknown은 사용 전 타입 체크 필요
let userName: string;
// userName = userInput; // ❌ 에러!

// 타입 체크 후 사용
if (typeof userInput === "string") {
  userName = userInput; // ✅ OK
}

// ============================================
// 6. 함수 타입 정의
// !! function 함수이름(매개변수: 타입): 반환타입
// ============================================

// 매개변수와 반환 타입 정의
function add(a : number, b : number) : string {
    return `합계는 ${a + b}입니다.`;
}

function greet(name: string): string {
  return `안녕하세요, ${name}님!`;
}


// 반환 값이 없는 함수 (void)
function logMessage(message: string): void {
  console.log(message);
  // return 없음
} // void는 반환값이 없음을 의미합니다.


// 화살표 함수
/*
# 사용하는 경우 : 
✔ 콜백 함수
✔ 이벤트 핸들러
✔ map / filter / reduce
✔ this 유지 필요할 때
✔ 짧은 함수
-> this와 같은 경우에 그냥 함수를 쓰면 작동하지 않아, 화살표 함수를 사용해야 함.
*/
const multiply = (x: number, y: number): number => {
  return x * y;
};


// ============================================
// 7. Optional 매개변수 (?)
// ============================================

function createUser(name : string, age? : number) : void { // 선택적 매개변수 - 써도 되고 안 써도 됨
    if(age !== undefined) {
        console.log(`사용자 ${name}은(는) ${age}세입니다.`);
    }else {
        console.log(`사용자 ${name}은(는) 나이를 모릅니다.`);
    }
}

createUser("m0d0ri205", 22); // 나이 있음
createUser("admina");         // 나이 없음


// ============================================
// 8. 기본값이 있는 매개변수
// ============================================
function createProduct(name: string, price: number = 0): void {
  console.log(`상품: ${name}, 가격: ${price}원`);
}

createProduct("노트북");           // 가격: 0원
createProduct("마우스", 25000);   // 가격: 25000원


// ============================================
// 실전 예제: 사용자 등록 함수
// ============================================

function registerUser(
  username: string,
  email: string,
  age?: number, // 선택적 매개변수 - 써도 되고 안 써도 됨
  isAdmin: boolean = false
): string {
  let message = `사용자 ${username} (${email}) 등록 완료!`;
  
  if (age !== undefined) {
    message += ` 나이: ${age}세`;
  }
  
  if (isAdmin) {
    message += " [관리자]";
  }
  
  return message;
}

// 테스트
console.log(registerUser("김철수", "chulsoo@example.com"));
console.log(registerUser("이영희", "younghee@example.com", 25));
console.log(registerUser("박민수", "minsu@example.com", 30, true));
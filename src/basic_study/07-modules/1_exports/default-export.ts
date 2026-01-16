// ============================================
// Default Export (기본 내보내기)
// ============================================
// 장점: import 시 원하는 이름으로 가져올 수 있음
// 단점: 파일당 하나만 가능

// 1. 클래스를 default로 export
export default class Database {
  private connection: string;

  constructor(url: string) {
    this.connection = url;
  }

  connect(): void {
    console.log(`Connected to ${this.connection}`);
  }

  disconnect(): void {
    console.log("Disconnected");
  }
}

// ❌ 파일당 하나만 가능
// export default class AnotherClass {} // Error!

// 💡 default export와 named export 함께 사용 가능
export const DB_VERSION = "1.0.0";
export function getConnectionString(): string {
  return "localhost:5432";
}

// ============================================
// 다른 default export 방식들
// ============================================

// 방식 1: 함수
// export default function connect() { ... }

// 방식 2: 객체
// export default {
//   name: "MyApp",
//   version: "1.0.0"
// }

// 방식 3: 화살표 함수
// const connect = () => { ... }
// export default connect;

// ============================================
// Mixed Export (혼합 내보내기)
// ============================================
// default export + named export 함께 사용

// Default Export: 주 기능
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint: string): Promise<any> {
    console.log(`GET ${this.baseUrl}${endpoint}`);
    return { data: "mock data" };
  }

  async post(endpoint: string, data: any): Promise<any> {
    console.log(`POST ${this.baseUrl}${endpoint}`, data);
    return { success: true };
  }
}

export default ApiClient;

// Named Exports: 보조 기능들
export const DEFAULT_TIMEOUT = 5000;
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export function createHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = { ...DEFAULT_HEADERS };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ============================================
// 사용 예시 (import 하는 쪽)
// ============================================
// import ApiClient, {
//   DEFAULT_TIMEOUT,
//   ApiResponse,
//   createHeaders
// } from './mixed-export';
//
// const client = new ApiClient("https://api.example.com");
// const headers = createHeaders("my-token");

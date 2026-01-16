// ============================================
// API 관련 타입 정의
// ============================================

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

export interface ApiEndpoints {
  users: string;
  products: string;
  orders: string;
  auth: string;
}

export type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

// ============================================
// Helpers (도우미 함수들)
// ============================================

// 딜레이 (비동기)
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 배열 섞기
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    const item = result[j];
    if (temp !== undefined && item !== undefined) {
      result[i] = item;
      result[j] = temp;
    }
  }
  return result;
}

// 랜덤 숫자 생성
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 랜덤 요소 선택
export function randomElement<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)];
}

// 배열에서 중복 제거
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

// 객체 깊은 복사
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// 두 배열의 교집합
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((item) => arr2.includes(item));
}

// 두 배열의 차집합
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((item) => !arr2.includes(item));
}

// 배열 청크 (n개씩 나누기)
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// 배열 평탄화
export function flatten<T>(array: any[]): T[] {
  return array.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val),
    []
  );
}

// 객체 키-값 바꾸기
export function invertObject<K extends string | number, V extends string | number>(
  obj: Record<K, V>
): Record<V, K> {
  const result = {} as Record<V, K>;
  for (const key in obj) {
    result[obj[key]] = key;
  }
  return result;
}

// 객체에서 특정 키만 선택
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

// 객체에서 특정 키 제외
export function omit<T, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}

// 디바운스 함수
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// 쓰로틀 함수
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 배열의 합
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

// 배열의 평균
export function average(numbers: number[]): number {
  return sum(numbers) / numbers.length;
}

// 최댓값
export function max(numbers: number[]): number {
  return Math.max(...numbers);
}

// 최솟값
export function min(numbers: number[]): number {
  return Math.min(...numbers);
}

// 범위 생성 (range(1, 5) → [1, 2, 3, 4, 5])
export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

// 객체를 쿼리스트링으로 변환
export function objectToQueryString(obj: Record<string, any>): string {
  return Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

// 쿼리스트링을 객체로 변환
export function queryStringToObject(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

// 재시도 로직 (비동기)
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      await delay(delayMs);
    }
  }
  throw new Error("All retry attempts failed");
}

// UUID 생성 (간단한 버전)
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 문자열을 해시값으로 변환
export function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

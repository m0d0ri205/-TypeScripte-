// ============================================
// Validators (유효성 검사 함수들)
// ============================================

// 이메일 검증
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 비밀번호 검증 (최소 8자, 대소문자, 숫자 포함)
export function validatePassword(password: string): boolean {
  if (password.length < 8) return false;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasUpperCase && hasLowerCase && hasNumber;
}

// 비밀번호 강도 체크
export function getPasswordStrength(
  password: string
): "weak" | "medium" | "strong" {
  if (password.length < 8) return "weak";

  let score = 0;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score === 3) return "medium";
  return "strong";
}

// 전화번호 검증 (한국 형식)
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
  return phoneRegex.test(phone);
}

// URL 검증
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// 숫자 범위 검증
export function validateRange(
  value: number,
  min: number,
  max: number
): boolean {
  return value >= min && value <= max;
}

// 빈 문자열 검증
export function isEmptyString(str: string): boolean {
  return str.trim().length === 0;
}

// 길이 검증
export function validateLength(
  str: string,
  min: number,
  max: number
): boolean {
  const length = str.length;
  return length >= min && length <= max;
}

// 날짜 검증
export function validateDate(date: string): boolean {
  const timestamp = Date.parse(date);
  return !isNaN(timestamp);
}

// 미래 날짜 검증
export function isFutureDate(date: Date): boolean {
  return date.getTime() > Date.now();
}

// 과거 날짜 검증
export function isPastDate(date: Date): boolean {
  return date.getTime() < Date.now();
}

// 신용카드 번호 검증 (Luhn 알고리즘)
export function validateCreditCard(cardNumber: string): boolean {
  const sanitized = cardNumber.replace(/\s|-/g, "");

  if (!/^\d+$/.test(sanitized)) return false;
  if (sanitized.length < 13 || sanitized.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    const char = sanitized[i];
    if (!char) continue;
    let digit = parseInt(char);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// 배열이 비어있는지 검증
export function isEmptyArray<T>(arr: T[]): boolean {
  return arr.length === 0;
}

// 객체가 비어있는지 검증
export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

// null 또는 undefined 검증
export function isNullOrUndefined(value: any): value is null | undefined {
  return value === null || value === undefined;
}

// 유효한 JSON 문자열인지 검증
export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

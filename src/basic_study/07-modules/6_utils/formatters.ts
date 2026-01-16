// ============================================
// Formatters (포맷팅 함수들)
// ============================================

// 통화 포맷 (원화)
export function formatCurrency(amount: number): string {
  return `₩${amount.toLocaleString("ko-KR")}`;
}

// 통화 포맷 (달러)
export function formatUSD(amount: number): string {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// 날짜 포맷 (YYYY-MM-DD)
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 날짜 포맷 (YYYY-MM-DD HH:mm:ss)
export function formatDateTime(date: Date): string {
  const dateStr = formatDate(date);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${dateStr} ${hours}:${minutes}:${seconds}`;
}

// 한글 날짜 포맷 (2024년 1월 15일)
export function formatKoreanDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

// 상대 시간 포맷 (방금 전, 1분 전, 1시간 전 등)
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 30) return `${diffDays}일 전`;

  return formatDate(date);
}

// 전화번호 포맷 (010-1234-5678)
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  return phone;
}

// 파일 크기 포맷 (1024 → 1KB)
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
}

// 백분율 포맷
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// 신용카드 번호 포맷 (1234-5678-9012-3456)
export function formatCreditCard(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, "");
  return cleaned.replace(/(\d{4})(?=\d)/g, "$1-");
}

// 신용카드 번호 마스킹 (****-****-****-3456)
export function maskCreditCard(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, "");
  const lastFour = cleaned.slice(-4);
  return `****-****-****-${lastFour}`;
}

// 이메일 마스킹 (test***@example.com)
export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  if (local.length <= 3) {
    return `${local[0]}***@${domain}`;
  }
  return `${local.slice(0, 3)}***@${domain}`;
}

// 이름 마스킹 (홍*동)
export function maskName(name: string): string {
  if (name.length <= 2) {
    return name[0] + "*";
  }
  return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
}

// 숫자에 콤마 추가
export function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}

// 소수점 자릿수 제한
export function formatDecimal(num: number, decimals: number): string {
  return num.toFixed(decimals);
}

// 문자열 잘라내기 (말줄임표 추가)
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

// 카멜케이스 → 스네이크케이스
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

// 스네이크케이스 → 카멜케이스
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// 첫 글자 대문자
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 모든 단어 첫 글자 대문자
export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

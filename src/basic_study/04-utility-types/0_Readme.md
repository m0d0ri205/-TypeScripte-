


# 📊 TypeScript 유틸리티 타입 요약표

| 유틸리티 타입 | 용도 | 예시 | 주요 사용처 |
|--------------|------|------|------------|
| **Partial<T>** | 모든 속성 Optional | `Partial<User>` | 업데이트 함수, 설정 객체 |
| **Required<T>** | 모든 속성 필수 | `Required<User>` | 완전한 데이터 요구 |
| **Readonly<T>** | 모든 속성 읽기전용 | `Readonly<Config>` | 상수, 불변 데이터 |
| **Pick<T, K>** | 특정 속성만 선택 | `Pick<User, "id" \| "name">` | 일부 필드, DTO |
| **Omit<T, K>** | 특정 속성 제외 | `Omit<User, "password">` | 민감정보 제외 |
| **Record<K, T>** | Key-Value 객체 | `Record<string, number>` | 매핑, 딕셔너리 |
| **Exclude<T, U>** | Union에서 제외 | `Exclude<Status, "cancelled">` | 특정 값 제거 |
| **Extract<T, U>** | Union에서 추출 | `Extract<Status, "active">` | 특정 값만 |
| **NonNullable<T>** | null/undefined 제거 | `NonNullable<T>` | 필수 값 보장 |
| **ReturnType<T>** | 함수 반환 타입 | `ReturnType<typeof fn>` | API 응답 타입 |
| **Parameters<T>** | 함수 매개변수 타입 | `Parameters<typeof fn>` | 함수 래퍼 |

## 상황별 사용 예시
// ✅ 데이터 수정/업데이트
Partial<T>

// ✅ 완전한 데이터 필요
Required<T>

// ✅ 상수/설정
Readonly<T>

// ✅ 필요한 것만 (화이트리스트)
Pick<T, K>

// ✅ 제외할 것만 (블랙리스트)
Omit<T, K>

// ✅ Key-Value 매핑
Record<K, T>

// ✅ null 안전성
NonNullable<T>

// ✅ 함수 타입 재사용
ReturnType<T>, Parameters<T>
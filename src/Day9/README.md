# Day 9: PostgreSQL + Prisma 설정

## 학습 목표
- PostgreSQL 데이터베이스 설치 및 연결
- Prisma ORM 사용법 익히기
- 기본 CRUD 작업 구현

## 체크리스트
- [ ] PostgreSQL 설치 및 연결
- [ ] Prisma 초기화
- [ ] User 모델 스키마 작성
- [ ] Prisma 마이그레이션
- [ ] Prisma Client 생성
- [ ] 기본 CRUD 테스트

## 1. PostgreSQL 설치

### macOS (Homebrew)
```bash
brew install postgresql@15
brew services start postgresql@15
```

### 데이터베이스 생성
```bash
createdb day9_prisma
```

## 2. Prisma 초기화

```bash
cd src/Day9
npm init -y
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

## 3. 환경 변수 설정 (.env)
```
DATABASE_URL="postgresql://username:password@localhost:5432/day9_prisma?schema=public"
```

## 4. User 모델 스키마 (prisma/schema.prisma)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 5. 마이그레이션 실행
```bash
npx prisma migrate dev --name init
```

## 6. Prisma Client 생성
```bash
npx prisma generate
```

## 7. 기본 CRUD 테스트
`index.ts` 파일에서 CRUD 작업을 테스트합니다.

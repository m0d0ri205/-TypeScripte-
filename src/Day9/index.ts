import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // CREATE - 사용자 생성
  const newUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });
  console.log('Created user:', newUser);

  // READ - 모든 사용자 조회
  const allUsers = await prisma.user.findMany();
  console.log('All users:', allUsers);

  // READ - 특정 사용자 조회
  const user = await prisma.user.findUnique({
    where: { email: 'test@example.com' },
  });
  console.log('Found user:', user);

  // UPDATE - 사용자 정보 수정
  const updatedUser = await prisma.user.update({
    where: { email: 'test@example.com' },
    data: { name: 'Updated User' },
  });
  console.log('Updated user:', updatedUser);

  // DELETE - 사용자 삭제
  const deletedUser = await prisma.user.delete({
    where: { email: 'test@example.com' },
  });
  console.log('Deleted user:', deletedUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

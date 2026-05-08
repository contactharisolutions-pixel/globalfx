const prisma = require('../lib/prisma')
async function main() {
  const users = await prisma.user.findMany({ select: { email: true, user_id: true } })
  const admins = await prisma.admin.findMany({ select: { email: true } })
  console.log('--- USERS ---')
  console.table(users)
  console.log('--- ADMINS ---')
  console.table(admins)
}
main().finally(() => prisma.$disconnect())

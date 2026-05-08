const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteMember() {
  const email = '980912mobile@test.com';
  console.log(`Searching for member with email: ${email}`);
  
  try {
    const member = await prisma.user.findUnique({
      where: { email }
    });

    if (!member) {
      console.log('Member not found.');
      return;
    }

    console.log(`Found member ID: ${member.id}. Deleting...`);
    
    // We should delete related records first if there are any constraints
    // but usually Prisma handles cascading or we might need to manually delete
    
    await prisma.user.delete({
      where: { email }
    });

    console.log('Successfully deleted test member.');
  } catch (error) {
    console.error('Error deleting member:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

deleteMember();

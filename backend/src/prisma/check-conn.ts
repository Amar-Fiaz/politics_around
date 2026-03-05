import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function check() {
  try {
    const candidates = await prisma.candidate.count()
    console.log(`DATABASE_SUCCESS: Found ${candidates} candidates.`)
  } catch (e) {
    console.error(`DATABASE_ERROR: ${e.message}`)
  } finally {
    await prisma.$disconnect()
  }
}
check()

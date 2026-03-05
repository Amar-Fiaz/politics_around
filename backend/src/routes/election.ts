import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const elections = await prisma.election.findMany({
      include: {
        constituency: true,
        votes: { include: { candidate: true } },
      },
    });
    res.json(elections);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching elections' });
  }
});

export default router;

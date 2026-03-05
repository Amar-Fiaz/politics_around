import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const candidates = await prisma.candidate.findMany({
      include: {
        party: true,
        constituency: { include: { city: true } },
        projects: true,
        promises: true,
      },
    });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching candidates' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: parseInt(id) },
      include: {
        party: true,
        constituency: { include: { city: true } },
        projects: true,
        promises: true,
        reviews: { include: { user: { select: { name: true } } } },
        votes: { include: { election: true } },
      },
    });
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching candidate details' });
  }
});

export default router;

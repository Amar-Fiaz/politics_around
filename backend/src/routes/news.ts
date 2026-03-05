import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { publishedAt: 'desc' },
    });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching news' });
  }
});

export default router;

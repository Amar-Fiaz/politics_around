import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res) => {
  const { candidateId, userId, content, rating } = req.body;
  try {
    const review = await prisma.review.create({
      data: {
        candidateId: parseInt(candidateId),
        userId: parseInt(userId),
        content,
        rating: parseInt(rating),
      },
    });
    // AI Sentiment Analysis call would happen here
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error creating review' });
  }
});

export default router;

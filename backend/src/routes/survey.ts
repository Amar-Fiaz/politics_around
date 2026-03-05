import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const surveys = await prisma.survey.findMany({
      include: {
        city: true,
        responses: { include: { user: { select: { name: true } } } },
      },
    });
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching surveys' });
  }
});

router.post('/:id/vote', async (req, res) => {
  const { id } = req.params;
  const { userId, rating, comment } = req.body;
  try {
    const response = await prisma.surveyResponse.create({
      data: {
        surveyId: parseInt(id),
        userId: parseInt(userId),
        rating: parseInt(rating),
        comment,
      },
    });
    const io = req.app.get('io');
    io.emit('surveyUpdate', { surveyId: id, response });
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting survey response' });
  }
});

export default router;

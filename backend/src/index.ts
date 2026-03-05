import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.js';
import candidateRoutes from './routes/candidate.js';
import electionRoutes from './routes/election.js';
import surveyRoutes from './routes/survey.js';
import reviewRoutes from './routes/review.js';
import newsRoutes from './routes/news.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Socket.io middleware
app.set('io', io);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/news', newsRoutes);

app.get('/', (req, res) => {
  res.send('Politics Around API is running...');
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { prisma, io };

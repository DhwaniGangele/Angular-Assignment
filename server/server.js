// server.js
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import Feedback from './src/models/feedback.model.js';

const app = express();

// Middleware
app.use(cors());         // allow all origins in dev
app.use(express.json()); // parse JSON bodies
app.use(morgan('dev'));  // request logging

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Feedback API
app.get('/api/feedback', async (_req, res) => {
  try {
    const all = await Feedback.find().sort({ createdAt: -1 }).lean();
    res.json(all);
  } catch (e) {
    res.status(500).json({ error: e?.message || 'List error' });
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !message) {
      return res.status(400).json({ error: 'name and message are required' });
    }
    const doc = await Feedback.create({ name, email, message });
    res.status(201).json(doc);
  } catch (e) {
    res.status(500).json({ error: e?.message || 'Create error' });
  }
});

// ENV
const { PORT = 5000, MONGODB_URI } = process.env;

// Start
async function startServer() {
  try {
    if (!MONGODB_URI) {
      console.error(' MONGODB_URI missing in .env');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected');

    app.listen(PORT, () =>
      console.log(` API running at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error(' Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}
startServer();

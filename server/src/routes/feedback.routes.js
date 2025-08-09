import express from 'express';
import { createFeedback, deleteFeedback, getFeedbacks } from '../controllers/feedback.controller.js';

const router = express.Router();

router.post('/', createFeedback);
router.get('/', getFeedbacks);
router.delete('/:id', deleteFeedback);

export default router;

import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    name:   { type: String, required: true, trim: true },
    email:  { type: String, trim: true },
    message:{ type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', feedbackSchema);

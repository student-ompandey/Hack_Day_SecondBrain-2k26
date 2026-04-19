import mongoose from 'mongoose';

const MemorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  data: {
    summary: [String],
    keyConcepts: [
      {
        term: String,
        definition: String
      }
    ],
    quiz: [
      {
        question: String,
        options: [String],
        correctAnswer: String
      }
    ]
  },
  dates: {
    review1: { type: Date, required: true },
    review2: { type: Date, required: true },
    review3: { type: Date, required: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Memory', MemorySchema);

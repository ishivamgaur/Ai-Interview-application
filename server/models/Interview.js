const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobRole: { type: String, required: true },
  experience: { type: String, required: true },
  difficulty: { type: String, required: true },
  questions: [
    {
      question: String,
      userAnswer: String,
      aiFeedback: String,
      score: Number,
    },
  ],
  overallScore: { type: Number },
  feedback: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Interview", InterviewSchema);

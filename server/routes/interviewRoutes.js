const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");
const {
  generateQuestions,
  evaluateAnswer,
} = require("../controllers/aiController");

// Middleware to verify token (simplified for brevity, should be in a separate file)
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    const decoded = require("jsonwebtoken").verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Start Interview
router.post("/start", auth, async (req, res) => {
  try {
    const { jobRole, experience, difficulty, questionCount } = req.body;
    const questions = await generateQuestions(
      jobRole,
      experience,
      difficulty,
      questionCount
    );

    const newInterview = new Interview({
      userId: req.user.id,
      jobRole,
      experience,
      difficulty,
      questions: questions.map((q) => ({
        question: q,
        userAnswer: "",
        aiFeedback: "",
        score: 0,
      })),
    });

    await newInterview.save();
    res.json(newInterview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Submit Answer (Single Question) - Optional if saving all at once
router.post("/:id/answer", auth, async (req, res) => {
  // Validate interview ID
  const { id } = req.params;
  const mongoose = require("mongoose");
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid interview ID" });
  }
  try {
    const { questionIndex, answer } = req.body;
    const interview = await Interview.findById(id);

    if (!interview) return res.status(404).json({ msg: "Interview not found" });

    const questionObj = interview.questions[questionIndex];
    const evaluation = await evaluateAnswer(questionObj.question, answer);

    questionObj.userAnswer = answer;
    questionObj.aiFeedback = evaluation.feedback;
    questionObj.score = evaluation.score;

    await interview.save();
    res.json(evaluation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get User History
router.get("/history", auth, async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(interviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get Specific Interview
router.get("/:id", auth, async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ msg: "Interview not found" });
    res.json(interview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

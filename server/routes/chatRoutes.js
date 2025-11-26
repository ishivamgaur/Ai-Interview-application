const express = require("express");
const router = express.Router();
const { chatWithAI } = require("../controllers/aiController");
const Interview = require("../models/Interview");

// Middleware to verify token
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

// Chat Route
router.post("/", auth, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ msg: "Message is required" });
    }

    // Fetch latest interview context
    const lastInterview = await Interview.findOne({ userId: req.user.id }).sort(
      { createdAt: -1 }
    );

    let context = "";
    if (lastInterview) {
      context = `The candidate is applying for a ${lastInterview.jobRole} role with ${lastInterview.experience} years of experience. Difficulty level: ${lastInterview.difficulty}.`;
    }

    const response = await chatWithAI(message, context);
    res.json({ response });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

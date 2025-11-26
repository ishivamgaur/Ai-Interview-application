require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate interview questions using Gemini. Falls back to static questions if API key missing or error.
exports.generateQuestions = async (role, experience, difficulty, count = 5) => {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not set. Using fallback questions.");
    return [
      "Describe your experience with MERN stack.",
      "What is the difference between SQL and NoSQL?",
      "Explain the React component lifecycle.",
    ];
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Generate ${count} interview questions for a ${role} with ${experience} years of experience. Difficulty: ${difficulty}.\nReturn ONLY a JSON array of strings. Example: ["Question 1", "Question 2"]`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]") + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("AI Generation Error:", error);
    // Fallback static questions
    return [
      "Describe your experience with MERN stack.",
      "What is the difference between SQL and NoSQL?",
      "Explain the React component lifecycle.",
    ];
  }
};

// Evaluate an answer using Gemini. Falls back to a default response if API key missing or error.
exports.evaluateAnswer = async (question, answer) => {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not set. Using fallback evaluation.");
    return { feedback: "Unable to evaluate at this time.", score: 0 };
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Question: "${question}"\nUser Answer: "${answer}"\nEvaluate this answer. Provide detailed feedback and a score out of 10. Use Markdown formatting (bold, bullet points) for clarity to structure the feedback.\nReturn JSON: { "feedback": "string", "score": number }`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("AI Evaluation Error:", error);
    return { feedback: "Unable to evaluate at this time.", score: 0 };
  }
};

// General Chat with AI
exports.chatWithAI = async (message, context = "") => {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not set. Using fallback response.");
    return "I am currently in offline mode. Please check your API key configuration.";
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let systemInstruction = `You are a professional technical interviewer conducting a mock interview.`;
    if (context) {
      systemInstruction += `\nContext about the candidate: ${context}`;
    }

    const prompt = `${systemInstruction}
    The user says: "${message}".
    Act exactly like an interviewer:
    1. If the user greets you, welcome them professionally and ask if they are ready to start.
    2. If the user asks a question, answer briefly and pivot back to interviewing them.
    3. If the user answers a question, evaluate it briefly (e.g., "Good point" or "Can you elaborate?") and ask a follow-up or a new technical question based on their experience level and tech stack.
    4. Keep responses concise (under 50 words) and spoken-style (avoid markdown formatting like **bold** or lists).
    5. Maintain a professional, neutral, yet encouraging tone.
    6. Do not break character.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};

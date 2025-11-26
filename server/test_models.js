require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // For some SDK versions, listModels might be on the client or model
    // But usually it is not directly exposed in the high level helper easily in all versions
    // Let's try to just run a generation with a very standard model to test
    // Or try to use the model.

    // Actually, let's try to use the 'gemini-1.5-flash' again but print the error details more clearly
    // or try 'gemini-1.0-pro'

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello");
    console.log("gemini-1.5-flash worked:", result.response.text());
  } catch (error) {
    console.error("gemini-1.5-flash failed:", error.message);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello");
    console.log("gemini-pro worked:", result.response.text());
  } catch (error) {
    console.error("gemini-pro failed:", error.message);
  }
}

listModels();

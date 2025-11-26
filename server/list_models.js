require("dotenv").config();
const fs = require("fs");

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    fs.writeFileSync("models_output.json", JSON.stringify(data, null, 2));
    console.log("Wrote models to models_output.json");
  } catch (error) {
    console.error("Error listing models:", error);
    fs.writeFileSync(
      "models_output.json",
      JSON.stringify({ error: error.message })
    );
  }
}

main();

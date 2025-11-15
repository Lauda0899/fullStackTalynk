const ollama = require('ollama').default; // Use .default for CommonJS

async function generateCoverLetter(req, res) {
  const { jobTitle, companyName, experience, interest, skills } = req.body;

  const prompt = `
Write a professional cover letter.

Job Title: ${jobTitle}
Company: ${companyName}
Experience: ${experience}
Skills: ${skills}
Motivation: ${interest}
  `.trim();

  try {
    const response = await ollama.chat({
      model: "llama2",
      messages: [
        { role: "system", content: "You are an assistant that writes professional cover letters." },
        { role: "user", content: prompt }
      ]
    });

    // Ollama response structure in Node.js: response.message.content
    res.json({ text: response.message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cover letter generation failed." });
  }
}

module.exports = { generateCoverLetter };

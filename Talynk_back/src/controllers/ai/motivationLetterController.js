const ollama = require('ollama').default;

exports.generateMotivationLetter = async (req, res) => {
  const { position, company, background, why, achievements } = req.body;

  try {
    const response = await ollama.chat({
      model: "llama2",
      messages: [
        { role: "system", content: "You write motivation letters in a professional tone." },
        { role: "user", content: `Write a motivation letter for the position ${position} at ${company}.
Background: ${background}
Why: ${why}
Achievements: ${achievements}` }
      ]
    });

    res.json({ text: response.message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate letter" });
  }
};

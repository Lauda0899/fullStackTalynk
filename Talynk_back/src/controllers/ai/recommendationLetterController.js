const ollama = require('ollama').default;

exports.generateRecommendationLetter = async (req, res) => {
  const { recipientName, relationship, achievements } = req.body;

  try {
    const response = await ollama.chat({
      model: "llama2",  // or llama2 if you prefer
      messages: [
        { role: "system", content: "You write professional recommendation letters." },
        { role: "user", content: `Write a recommendation letter for ${recipientName}.
Relationship: ${relationship}
Achievements: ${achievements}` }
      ]
    });

    res.json({ text: response.message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate recommendation letter" });
  }
};

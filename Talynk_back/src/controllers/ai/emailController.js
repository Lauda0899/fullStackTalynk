const ollama = require('ollama').default; // use .default in CommonJS

async function generateEmail(req, res) {
  const { emailType, recipientName, recipientTitle, context } = req.body;

  const prompt = `
Write a ${emailType} professional email.

Recipient: ${recipientTitle} ${recipientName}
Context: ${context}
  `.trim();

  try {
    const response = await ollama.chat({
      model: "llama2",
      messages: [
        { role: "system", content: "You are an assistant that writes professional emails." },
        { role: "user", content: prompt }
      ]
    });

    // Node.js SDK returns response.message.content
    res.json({ text: response.message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email generation failed." });
  }
}

module.exports = { generateEmail };

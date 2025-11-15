const ollama = require('ollama').default;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs').promises;
const { PDFParse } = require('pdf-parse');

async function improveCV(req, res) {
  try {
    const { position } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let cvText = '';

    // ---------------------------
    // PDF HANDLING (v2 compatible)
    // ---------------------------
    if (file.mimetype === 'application/pdf') {
      // Read uploaded PDF file
      const dataBuffer = await fs.readFile(file.path);

      // Correct v2 usage:
      const parser = new PDFParse({ data: dataBuffer });

      // Extract text
      const pdfData = await parser.getText();
      cvText = pdfData.text;

    } else {
      // Fallback for .txt or unsupported formats
      cvText = await fs.readFile(file.path, 'utf8');
    }

    const prompt = `
Improve this CV for the position: ${position}.
Provide detailed suggestions and improvements.
CV content: ${cvText}
    `.trim();

    const response = await ollama.chat({
      model: "llama2",
      messages: [
        { role: "system", content: "You are an expert career advisor and CV reviewer." },
        { role: "user", content: prompt }
      ]
    });

    // Delete uploaded file
    await fs.unlink(file.path);

    res.json({ suggestions: response.message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "CV improvement failed." });
  }
}

module.exports = { improveCV };

exports.getWriterPage = (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome to the AI Writing Assistant route.",
      info: "This is where your React frontend (localhost:3000/writer) connects.",
    });
  } catch (error) {
    console.error("Error loading writer page:", error);
    res.status(500).json({ error: "Failed to load writer page" });
  }
};

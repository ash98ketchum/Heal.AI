const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs/promises");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();

/* ===============================
   MIDDLEWARE
================================ */
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));
app.use(express.json());

/* ===============================
   HEALTH CHECK (IMPORTANT)
================================ */
app.get("/health", (_, res) => {
  res.json({ status: "Backend running ✅" });
});

/* ===============================
   CHATBOT ROUTE
================================ */
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `
You are Heal.AI — a calm, empathetic health assistant.
You do NOT diagnose or prescribe.
You provide emotional support, guidance, and encourage professional help.
            `,
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (err) {
    console.error("❌ Chat error:", err?.response?.data || err.message);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

/* ===============================
   SYMPTOM PREDICTION ROUTE
================================ */
app.post('/api/predict', async (req, res) => {
  try {
    console.log("📥 Incoming request body:", req.body);

    const { symptoms, duration, severity } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: "No symptoms provided" });
    }

    const baseDir = path.resolve(__dirname);
    const userDataPath = path.join(baseDir, 'user_data.json');

    await fs.writeFile(
      userDataPath,
      JSON.stringify({ symptoms, duration, severity }, null, 2)
    );

    console.log("✅ user_data.json written");

    await new Promise((resolve, reject) => {
      exec('python predict_from_json.py', { cwd: baseDir }, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const result = await fs.readFile(
      path.join(baseDir, 'predicted.json'),
      'utf-8'
    );

    res.json(JSON.parse(result));
  } catch (err) {
    console.error("❌ Backend error:", err);
    res.status(500).json({ error: 'Prediction failed' });
  }
});


/* ===============================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

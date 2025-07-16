const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
require('dotenv').config(); // <-- loads .env

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 Chatbot route using Groq
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192', // ✅ Updated model
        messages: [
          {
  "role": "system",
  "content": "You are Heal.AI, a warm, empathetic, and intelligent virtual therapist and medical support assistant. You help users from all backgrounds reflect on their symptoms—physical, emotional, or psychological—without diagnosing or prescribing. Instead, you offer helpful insights, mental health support, symptom context, and encouragement to speak with healthcare professionals when necessary.\n\nRespond in a human, conversational tone. Avoid repeating yourself. Always aim to understand and gently guide the user. Use active listening skills. Example prompts include:\n- \"Can you tell me more about how you've been feeling lately?\"\n- \"It’s completely okay to feel that way. How long has this been going on?\"\n- \"Would you like to explore possible causes together?\"\n\nNever provide medical diagnoses or specific treatments. If symptoms seem serious, gently recommend seeing a healthcare professional.\n\nYour goal is to make users feel heard, supported, and better informed about their well-being."
},

          { role: 'user', content: message },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error('Groq Error:', err?.response?.data || err.message);
    res.status(500).json({ error: 'AI failed. Check backend logs.' });
  }
});


// 👇 keep your existing /api/predict route as-is
app.post('/api/predict', async (req, res) => {
  try {
    const { symptoms, duration, severity } = req.body;

    const baseDir = path.resolve(__dirname);
    const userDataPath = path.join(baseDir, 'user_data.json');
    await fs.writeFile(userDataPath, JSON.stringify({ symptoms, duration, severity }, null, 2));

    await new Promise((resolve, reject) => {
      exec('python predict_from_json.py', { cwd: baseDir }, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    await new Promise((r) => setTimeout(r, 1000));

    const predText = await fs.readFile(path.join(baseDir, 'predicted.json'), 'utf-8');
    const data = JSON.parse(predText);
    return res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡️ Predict + Chat server running on ${PORT}`));

// server.js
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/predict', async (req, res) => {
  try {
    const { symptoms, duration, severity } = req.body;

    // 1) write user_data.json next to predict_from_json.py
    const baseDir = path.resolve(__dirname);
    const userDataPath = path.join(baseDir, 'user_data.json');
    await fs.writeFile(
      userDataPath,
      JSON.stringify({ symptoms, duration, severity }, null, 2)
    );

    // 2) exec Python predictor
    await new Promise((resolve, reject) => {
      exec(
        'python predict_from_json.py',
        { cwd: baseDir },
        (err, stdout, stderr) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });

    // 3) wait 20s
    await new Promise(r => setTimeout(r, 1_000));

    // 4) read predicted.json
    const predText = await fs.readFile(path.join(baseDir, 'predicted.json'), 'utf-8');
    const data = JSON.parse(predText);
    return res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡️ Predict server listening on ${PORT}`));

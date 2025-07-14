const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/downloads', express.static('downloads'));

// Ensure downloads folder exists
const downloadDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);

app.post('/convert', async (req, res) => {
  const { url } = req.body;
  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const id = Date.now(); // unique filename based on timestamp
  const filename = `ytmp3_${id}.mp3`;
  const outputPath = path.join(downloadDir, filename);

  const command = `yt-dlp -x --audio-format mp3 -o "${outputPath}" "${url}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ error: 'Download failed.' });
    }

    console.log(`Downloaded: ${outputPath}`);
    res.json({ downloadUrl: `/downloads/${filename}` });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

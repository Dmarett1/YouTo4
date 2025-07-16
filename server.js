const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/downloads', express.static('downloads'));

// Ensure download directory exists
const downloadDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);

// In-memory progress tracker
let progressMap = {};

app.post('/convert', (req, res) => {
  const { url } = req.body;
  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const id = Date.now();
  const filename = `ytmp3_${id}.mp3`;
  const outputPath = path.join(downloadDir, filename);

  const command = `yt-dlp -x --audio-format mp3 -o "${outputPath}" "${url}"`;

  const ytdlp = spawn(command, { shell: true });

  ytdlp.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });

  ytdlp.on('close', code => {
    if (code === 0) {
      res.json({ downloadUrl: `/downloads/${filename}` });
    } else {
      res.status(500).json({ error: 'MP3 conversion failed.' });
    }
  });
});

app.post('/convert-mp4', (req, res) => {
  const { url } = req.body;
  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const id = Date.now();
  const filename = `ytmp4_${id}.mp4`;
  const outputPath = path.join(downloadDir, filename);

  // FIX: This ensures we get H.264 (avc1) video only, avoiding AV1
  const command = `yt-dlp -f "bv*[ext=mp4][vcodec*=avc1]+ba[ext=m4a]/mp4" -o "${outputPath}" "${url}"`;

  const ytdlp = spawn(command, { shell: true });

  progressMap[id] = 'Processing';

  ytdlp.stdout.on('data', data => {
    const text = data.toString();
    console.log('stdout:', text);
    const match = text.match(/(\d{1,3}\.\d)%/);
    if (match) {
      progressMap[id] = match[1];
    }
  });

  ytdlp.stderr.on('data', data => {
    console.error('stderr:', data.toString());
  });

  ytdlp.on('close', code => {
    if (code === 0) {
      progressMap[id] = 'done';
      res.json({ id, downloadUrl: `/downloads/${filename}` });
    } else {
      progressMap[id] = 'error';
      res.status(500).json({ error: 'MP4 conversion failed.' });
    }
  });
});

app.get('/progress/:id', (req, res) => {
  const { id } = req.params;
  res.json({ progress: progressMap[id] || null });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

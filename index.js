const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/preview/:trackId', async (req, res) => {
  const trackId = req.params.trackId;
  const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;

  try {
    const { data: html } = await axios.get(embedUrl);
    const $ = cheerio.load(html);

    const scriptTag = $('script').filter((_, el) => {
      return $(el).html().includes('audioPreview');
    }).first();

    const scriptContent = scriptTag.html();
    const match = scriptContent.match(/"audioPreview":"(https[^"]+)"/);

    if (match && match[1]) {
      return res.json({ preview_url: match[1] });
    }

    res.status(404).json({ error: 'Preview URL not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch preview URL', detail: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Spotify Preview API is running. Use /preview/:trackId to get a preview.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
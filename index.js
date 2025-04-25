const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/preview/:trackId", async (req, res) => {
  const trackId = req.params.trackId;
  const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;

  try {
    const response = await axios.get(embedUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    const scriptTagContent = $('#__NEXT_DATA__').html();
    if (!scriptTagContent) return res.status(404).json({ error: "Script tag not found" });

    const json = JSON.parse(scriptTagContent);

    // Safely navigate to audioPreview.url
    const previewUrl = json?.props?.pageProps?.state?.data?.entity?.audioPreview?.url;

    if (previewUrl) {
      res.json({ preview_url: previewUrl });
    } else {
      res.status(404).json({ error: "No preview URL found for this track." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
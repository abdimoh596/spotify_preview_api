# 🎧 Spotify Preview API

A lightweight Node.js and Express API that fetches 30-second audio preview links for Spotify tracks using HTML scraping. This API serves as a workaround for the deprecated or missing `preview_url` field in Spotify's official Web API.

Perfect for use in mobile or web apps where you want to play Spotify song previews without requiring a full audio playback SDK.

---

## 🚀 Features

- 🔍 Retrieves 30-second preview audio URLs using Spotify track IDs
- ⚡ Fast and minimal server setup
- 🧠 Fallback solution for `preview_url` issues in the Spotify Web API
- 🛠️ Built with Express, Axios, and Cheerio
- 🌍 Easily deployable on Render, Vercel, or Railway

---

## 📦 Tech Stack

- Node.js
- Express.js
- [Cheerio](https://github.com/cheeriojs/cheerio) – for scraping the embed page
- [Axios](https://axios-http.com/) – for HTTP requests

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

bash  
git clone https://github.com/abdimoh596/spotify-preview-api.git
cd spotify-preview-api

### 2. Install Dependencies### 1. Clone the Repository
npm install

### 3. Start the Server
node server.js


### 🎯 How It Works
The API scrapes the embed version of a Spotify track page:

https://open.spotify.com/embed/track/{trackId}
From that page, it extracts the actual preview_url if available.

### 📡 API Endpoint
GET /preview/:trackId
Fetches a 30-second preview link for the given track ID.

Example Request
GET /preview/4uLU6hMCjMI75M1A2tKUQC

Example cURL
curl https://your-api.com/preview/4uLU6hMCjMI75M1A2tKUQC

Example Response
{
  "preview_url": "https://p.scdn.co/mp3-preview/abc123xyz456.mp3"
}

If no preview is found:
{
  "preview_url": null
}
```

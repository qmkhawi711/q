const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url parameter');
  res.redirect(url);
});

app.get('/player', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).send('Missing url parameter');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="referrer" content="no-referrer" />
      <title>Video Player</title>
      <style>
        body { margin: 0; background: black; }
        video { width: 100vw; height: 100vh; }
      </style>
    </head>
    <body>
      <video id="video" controls autoplay muted playsinline></video>
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      <script>
        var video = document.getElementById('video');
        var url = "${videoUrl}";
        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(url);
          hls.attachMedia(video);
        } else {
          video.src = url;
        }
      </script>
    </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
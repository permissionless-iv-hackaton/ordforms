const express = require('express');
const multer = require('multer');
const { storage } = require('../services/firebaseService');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  if (!storage) {
    return res.status(503).send('File storage not available');
  }

  const blob = storage.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    res.status(500).send(err.message);
  });

  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${blob.bucket.name}/${blob.name}`;
    res.status(200).send({ url: publicUrl });
  });

  blobStream.end(req.file.buffer);
});

module.exports = router;
const express = require('express');
const {
  inscribeContent,
  P5_INSCRIPTION_ID
} = require('../services/ordinalsService');
const router = express.Router();

const allowedTypes = ['user', 'creator', 'business'];

router.get('/:type', async (req, res) => {
  const { type } = req.params;
  const format = req.query.format || 'svg';
  const shouldInscribe = req.query.inscribe === 'true';
  const generative = req.query.generative === 'true';
  const parent = req.query.parent || P5_INSCRIPTION_ID;
  const customName = req.query.name;

  if (!customName && !allowedTypes.includes(type)) {
    return res.status(400).send('Invalid type');
  }

  const text = customName ? customName : type.toUpperCase();
  const html = `<div>${text}</div>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="40"><text x="10" y="25" font-size="20">${text}</text></svg>`;

  const generativeHtml = `<!doctype html>
<script src="ord:${P5_INSCRIPTION_ID}"></script>
<script>
function setup(){
  createCanvas(200,40);
  background(255);
  fill(random(50,200));
  textSize(20);
  text('${text}',10,25);
  noLoop();
}
</script>`;

  const contentToSend = generative ? generativeHtml : format === 'html' ? html : svg;
  const mimeType = generative || format === 'html' ? 'text/html' : 'image/svg+xml';

  if (shouldInscribe) {
    try {
      const order = await inscribeContent(contentToSend, mimeType, parent);
      return res.json({ success: true, order });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (generative || format === 'html') {
    res.setHeader('Content-Type', 'text/html');
    return res.send(contentToSend);
  }
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

module.exports = router;

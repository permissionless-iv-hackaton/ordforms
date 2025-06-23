const { db, storage } = require('../services/firebaseService');
const fs = require('fs');
const pdf = require('pdf-parse');
const { createTimestamp } = require('../services/timestampService');
const crypto = require('crypto');
const { estimateCost } = require('../services/ordinalsService');

const VALID_VOUCHER = 'PERMISSIONLESS';

const verifyVoucher = (req, res) => {
  const { code } = req.body;
  if ((code || '').trim().toLowerCase() === VALID_VOUCHER.toLowerCase()) {
    return res.status(200).json({ valid: true });
  }
  return res.status(401).json({ valid: false, message: 'Invalid voucher' });
};

const parseResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const buffer = fs.readFileSync(req.file.path);
  const data = await pdf(buffer);
  const text = data.text;
  const lines = text.split(/\n/).map((l) => l.trim());
  const [firstLine] = lines;
  const [name, surname] = firstLine.split(' ');
  return res.json({ name, surname });
};

const createSubmission = async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ success: false, error: 'Firebase disabled' });
    }
    const data = req.body;
    let fileUrl;
    let tsHash;
    let contentHash;
    let cost;

    if (req.file && storage) {
      const upload = await storage.upload(req.file.path, {
        destination: `documents/${req.file.originalname}`
      });
      fileUrl = `gs://${upload[0].bucket.name}/${upload[0].name}`;

      const buffer = fs.readFileSync(req.file.path);
      const ts = await createTimestamp(buffer);
      await storage.upload(ts.path, { destination: `timestamps/${ts.hash}.ots` });
      tsHash = ts.hash;

      const hash = crypto.createHash('sha256').update(buffer).digest('hex');
      contentHash = hash;
      cost = await estimateCost(Buffer.from(hash, 'hex'));
    } else if (req.file) {
      const buffer = fs.readFileSync(req.file.path);
      const ts = await createTimestamp(buffer);
      tsHash = ts.hash;

      const hash = crypto.createHash('sha256').update(buffer).digest('hex');
      contentHash = hash;
    }

    const docRef = await db.collection('submissions').add({
      ...data,
      fileUrl,
      tsHash,
      contentHash,
      cost,
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ success: true, id: docRef.id, cost, hash: contentHash });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const getSubmission = async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ success: false, error: 'Firebase disabled' });
    }
    const { id } = req.params;
    const doc = await db.collection('submissions').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Not found' });
    }
    return res.status(200).json({ success: true, data: doc.data() });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

module.exports = {
  verifyVoucher,
  parseResume,
  createSubmission,
  getSubmission
};

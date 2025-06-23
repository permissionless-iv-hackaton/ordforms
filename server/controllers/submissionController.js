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
  
  try {
    const buffer = fs.readFileSync(req.file.path);
    const data = await pdf(buffer);
    const text = data.text;
    const lines = text.split(/\n/).map((l) => l.trim());
    const [firstLine] = lines;
    const [name, surname] = firstLine.split(' ');
    return res.json({ name, surname });
  } catch (error) {
    console.error('PDF parsing error:', error.message);
    return res.status(400).json({ error: 'Invalid PDF file' });
  }
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

    if (req.file) {
      try {
        const buffer = fs.readFileSync(req.file.path);
        const hash = crypto.createHash('sha256').update(buffer).digest('hex');
        contentHash = hash;
        
        // Upload file to Firebase Storage if available
        if (storage) {
          try {
            const upload = await storage.upload(req.file.path, {
              destination: `documents/${req.file.originalname}`
            });
            fileUrl = `gs://${upload[0].bucket.name}/${upload[0].name}`;
          } catch (uploadError) {
            console.error('File upload error:', uploadError.message);
            // Continue without file upload
          }
        }
        
        // Create timestamp if service is available
        try {
          const ts = await createTimestamp(buffer);
          tsHash = ts.hash;
          
          if (storage) {
            await storage.upload(ts.path, { destination: `timestamps/${ts.hash}.ots` });
          }
        } catch (timestampError) {
          console.error('Timestamp creation error:', timestampError.message);
          // Continue without timestamp
        }
        
        // Estimate cost if service is available
        try {
          cost = await estimateCost(Buffer.from(hash, 'hex'));
        } catch (costError) {
          console.error('Cost estimation error:', costError.message);
          // Continue without cost estimation
        }
      } catch (fileError) {
        console.error('File processing error:', fileError.message);
        return res.status(400).json({ success: false, error: 'File processing failed' });
      }
    }

    const submissionData = {
      ...data,
      createdAt: new Date().toISOString()
    };

    // Only add fields that have values
    if (fileUrl) submissionData.fileUrl = fileUrl;
    if (tsHash) submissionData.tsHash = tsHash;
    if (contentHash) submissionData.contentHash = contentHash;
    if (cost) submissionData.cost = cost;

    const docRef = await db.collection('submissions').add(submissionData);
    
    res.status(201).json({ success: true, id: docRef.id, cost, hash: contentHash });
  } catch (err) {
    console.error('Submission creation error:', err.message);
    res.status(500).json({ success: false, error: err.message });
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

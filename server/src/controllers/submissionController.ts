import { Request, Response } from 'express';
import { db, storage } from '../services/firebaseService';
import fs from 'fs';
import pdf from 'pdf-parse';
import { createTimestamp } from '../services/timestampService';
import crypto from 'crypto';
import { estimateCost } from '../services/ordinalsService';

const VALID_VOUCHER = 'PERMISSIONLESS';

export const verifyVoucher = (req: Request, res: Response) => {
  const { code } = req.body;
  if (code === VALID_VOUCHER) {
    return res.status(200).json({ valid: true });
  }
  return res.status(401).json({ valid: false, message: 'Invalid voucher' });
};

export const parseResume = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const buffer = fs.readFileSync(req.file.path);
  const data = await pdf(buffer);
  const text = data.text;
  const lines = text.split(/\n/).map((l: string) => l.trim());
  const [firstLine] = lines;
  const [name, surname] = firstLine.split(' ');
  return res.json({ name, surname });
};

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let fileUrl: string | undefined;
    let tsHash: string | undefined;
    let contentHash: string | undefined;
    let cost: number | undefined;

    if (req.file) {
      const upload = await storage.upload(req.file.path, {
        destination: `documents/${req.file.originalname}`,
      });
      fileUrl = `gs://${upload[0].bucket.name}/${upload[0].name}`;

      const buffer = fs.readFileSync(req.file.path);
      const ts = await createTimestamp(buffer);
      await storage.upload(ts.path, { destination: `timestamps/${ts.hash}.ots` });
      tsHash = ts.hash;

      const hash = crypto.createHash('sha256').update(buffer).digest('hex');
      contentHash = hash;
      cost = await estimateCost(Buffer.from(hash, 'hex'));

    }

    const docRef = await db.collection('submissions').add({
      ...data,
      fileUrl,
      tsHash,
      contentHash,
      cost,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ success: true, id: docRef.id, cost, hash: contentHash });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const getSubmission = async (req: Request, res: Response) => {
  try {
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


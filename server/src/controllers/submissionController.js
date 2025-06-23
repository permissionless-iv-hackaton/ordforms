import db from '../services/firebaseAdmin.js';

const VALID_VOUCHER = 'PERMISSIONLESS';

export const verifyVoucher = (req, res) => {
  const { code } = req.body;
  if (code === VALID_VOUCHER) {
    return res.status(200).json({ valid: true });
  }
  return res.status(401).json({ valid: false, message: 'Invalid voucher' });
};

export const createSubmission = async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection('submissions').add({
      ...data,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ success: true, id: docRef.id });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
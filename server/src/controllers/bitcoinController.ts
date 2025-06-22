import { Request, Response } from 'express';
import { db } from '../services/firebaseService';
import { generateZapriteInvoice } from '../services/zapriteService';

export const linkWallet = async (req: Request, res: Response) => {
  const { userId, pubkey } = req.body;
  try {
    await db.collection('wallets').doc(userId).set({ pubkey });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const storeOrdinalsAddress = async (req: Request, res: Response) => {
  const { userId, ordAddress } = req.body;
  try {
    await db.collection('ordinals').doc(userId).set({ ordAddress });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const initiateZapritePayment = async (req: Request, res: Response) => {
  const { amount, currency, metadata } = req.body;
  try {
    const invoice = await generateZapriteInvoice(amount, currency, metadata);
    res.status(200).json({ success: true, invoice });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
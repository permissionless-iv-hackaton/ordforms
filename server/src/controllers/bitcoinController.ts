import { Request, Response } from 'express';
import { db } from '../services/firebaseService';
import { generateZapriteInvoice } from '../services/zapriteService';
import { createPaypalInvoice } from '../services/paypalService';
import { estimateCost, inscribeHash } from '../services/ordinalsService';
import { pushOpReturn } from '../services/opReturnService';

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

export const initiatePaypalPayment = async (req: Request, res: Response) => {
  const { amount, currency } = req.body;
  try {
    const link = await createPaypalInvoice(amount, currency);
    res.status(200).json({ success: true, link });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const getInscriptionCost = async (req: Request, res: Response) => {
  const { hash } = req.body;
  try {
    const cost = await estimateCost(Buffer.from(hash, 'hex'));
    res.status(200).json({ success: true, cost });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const inscribeSubmission = async (req: Request, res: Response) => {
  const { hash, parent } = req.body;
  try {
    const order = await inscribeHash(hash, parent);
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const pushOpReturnHash = async (req: Request, res: Response) => {
  const { hash } = req.body;
  try {
    const tx = await pushOpReturn(hash);
    res.status(200).json({ success: true, tx });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};


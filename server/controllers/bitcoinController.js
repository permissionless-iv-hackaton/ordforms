const { db } = require('../services/firebaseService');
const { generateZapriteInvoice } = require('../services/zapriteService');
const { createPaypalInvoice } = require('../services/paypalService');
const { estimateCost, inscribeHash } = require('../services/ordinalsService');
const { pushOpReturn } = require('../services/opReturnService');

const linkWallet = async (req, res) => {
  const { userId, pubkey } = req.body;
  try {
    await db.collection('wallets').doc(userId).set({ pubkey });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const storeOrdinalsAddress = async (req, res) => {
  const { userId, ordAddress } = req.body;
  try {
    await db.collection('ordinals').doc(userId).set({ ordAddress });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const initiateZapritePayment = async (req, res) => {
  const { amount, currency, metadata } = req.body;
  try {
    const invoice = await generateZapriteInvoice(amount, currency, metadata);
    res.status(200).json({ success: true, invoice });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const initiatePaypalPayment = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const link = await createPaypalInvoice(amount, currency);
    res.status(200).json({ success: true, link });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const getInscriptionCost = async (req, res) => {
  const { hash } = req.body;
  try {
    const cost = await estimateCost(Buffer.from(hash, 'hex'));
    res.status(200).json({ success: true, cost });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const inscribeSubmission = async (req, res) => {
  const { hash, parent } = req.body;
  try {
    const order = await inscribeHash(hash, parent);
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const pushOpReturnHash = async (req, res) => {
  const { hash } = req.body;
  try {
    const tx = await pushOpReturn(hash);
    res.status(200).json({ success: true, tx });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

module.exports = {
  linkWallet,
  storeOrdinalsAddress,
  initiateZapritePayment,
  initiatePaypalPayment,
  getInscriptionCost,
  inscribeSubmission,
  pushOpReturnHash
};

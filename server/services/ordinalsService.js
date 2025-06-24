const { Ordinalsbot } = require('ordinalsbot');

const API_KEY = process.env.ORDINALSBOT_API_KEY || '';
const NETWORK = 'testnet';
const ord = new Ordinalsbot(API_KEY, NETWORK);

// Inscription containing p5.min.js v2.0.1 used for recursion
const P5_INSCRIPTION_ID =
  'bed725759768159b0868fe0e6c9cd26a4c437f9e0903f70893edad280e35d843i0';

const estimateCost = async (content) => {
  const inscription = ord.Inscription();
  const order = await inscription.createOrder({
    files: [
      {
        size: content.length,
        type: 'text/plain',
        name: 'hash.txt',
        dataURL: `data:text/plain;base64,${content.toString('base64')}`
      }
    ],
    receiveAddress: process.env.INTERNAL_BTC_WALLET || ''
  });
  return order.price || 0;
};

const inscribeHash = async (hash, parent) => {
  const inscription = ord.Inscription();
  const order = await inscription.createOrder({
    files: [
      {
        size: hash.length,
        type: 'text/plain',
        name: 'hash.txt',
        dataURL: `data:text/plain;base64,${Buffer.from(hash).toString('base64')}`
      }
    ],
    ...(parent ? { parent } : { parent: P5_INSCRIPTION_ID }),
    receiveAddress: process.env.INTERNAL_BTC_WALLET || ''
  });
  return order;
};

const inscribeContent = async (content, mimeType, parent) => {
  const inscription = ord.Inscription();
  const dataURL = `data:${mimeType};base64,${Buffer.from(content).toString('base64')}`;
  const order = await inscription.createOrder({
    files: [
      {
        size: Buffer.byteLength(content),
        type: mimeType,
        name: 'signature',
        dataURL
      }
    ],
    ...(parent ? { parent } : { parent: P5_INSCRIPTION_ID }),
    receiveAddress: process.env.INTERNAL_BTC_WALLET || ''
  });
  return order;
};

module.exports = { estimateCost, inscribeHash, inscribeContent, P5_INSCRIPTION_ID };

const { Ordinalsbot } = require('ordinalsbot');

const API_KEY = process.env.ORDINALSBOT_API_KEY || '';
const NETWORK = 'testnet';
const ord = new Ordinalsbot(API_KEY, NETWORK);

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
    ...(parent ? { parent } : {}),
    receiveAddress: process.env.INTERNAL_BTC_WALLET || ''
  });
  return order;
};

module.exports = { estimateCost, inscribeHash };

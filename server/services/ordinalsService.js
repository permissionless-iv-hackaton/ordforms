let ord = null;

try {
  const { Ordinalsbot } = require('ordinalsbot');
  const API_KEY = process.env.ORDINALSBOT_API_KEY || '';
  const NETWORK = 'testnet';
  
  if (API_KEY) {
    ord = new Ordinalsbot(API_KEY, NETWORK);
    console.log('OrdinalsBot initialized successfully');
  } else {
    console.log('OrdinalsBot API key not found. Running without OrdinalsBot.');
  }
} catch (error) {
  console.log('Error initializing OrdinalsBot:', error.message);
  console.log('Running without OrdinalsBot.');
}

// Inscription containing p5.min.js v2.0.1 used for recursion
const P5_INSCRIPTION_ID =
  'bed725759768159b0868fe0e6c9cd26a4c437f9e0903f70893edad280e35d843i0';

const estimateCost = async (content) => {
  if (!ord) {
    console.log('OrdinalsBot not available for cost estimation');
    return 0;
  }
  
  try {
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
  } catch (error) {
    console.error('Error estimating cost:', error.message);
    return 0;
  }
};

const inscribeHash = async (hash, parent) => {
  if (!ord) {
    throw new Error('OrdinalsBot not available');
  }
  
  try {
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
  } catch (error) {
    console.error('Error inscribing hash:', error.message);
    throw error;
  }
};

const inscribeContent = async (content, mimeType, parent) => {
  if (!ord) {
    throw new Error('OrdinalsBot not available');
  }
  
  try {
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
  } catch (error) {
    console.error('Error inscribing content:', error.message);
    throw error;
  }
};

module.exports = { estimateCost, inscribeHash, inscribeContent, P5_INSCRIPTION_ID };

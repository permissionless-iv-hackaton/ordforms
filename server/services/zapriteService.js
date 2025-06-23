const axios = require('axios');

const generateZapriteInvoice = async (amount, currency, metadata) => {
  const ZAPRITE_API_KEY = process.env.ZAPRITE_API_KEY;
  const url = 'https://api.zaprite.com/v1/invoices';
  const headers = {
    Authorization: `Bearer ${ZAPRITE_API_KEY}`,
    'Content-Type': 'application/json'
  };

  const payload = { amount, currency, metadata };

  const { data } = await axios.post(url, payload, { headers });
  return data;
};

module.exports = { generateZapriteInvoice };

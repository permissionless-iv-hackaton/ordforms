const axios = require('axios');

async function run() {
  const type = process.argv[2] || 'user';
  const endpoint = process.env.SIGNATURE_ENDPOINT || 'http://localhost:3000/api/signature';
  const name = process.env.SIGNATURE_NAME || 'OrdForms';
  try {
    const res = await axios.get(`${endpoint}/${type}?format=html&inscribe=true&generative=true&name=${encodeURIComponent(name)}`);
    console.log(res.data);
  } catch (err) {
    console.error('Agent error:', err.response ? err.response.data : err.message);
  }
}

run();

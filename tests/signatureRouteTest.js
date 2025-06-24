const axios = require('axios');

(async () => {
  const type = 'user';
  try {
    const res = await axios.get(`http://localhost:3000/api/signature/${type}?format=html&inscribe=true&generative=true&name=OrdForms`);
    console.log(res.data);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
})();

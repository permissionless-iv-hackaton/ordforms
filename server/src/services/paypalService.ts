import axios from 'axios';
import qs from 'querystring';

export const createPaypalInvoice = async (amount: number, currency: string) => {
  const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
  const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';
  const base = 'https://api-m.sandbox.paypal.com';
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');

  const { data: token } = await axios.post<{ access_token: string }>(
    `${base}/v1/oauth2/token`,
    qs.stringify({ grant_type: 'client_credentials' }),
    { headers: { Authorization: `Basic ${auth}` } }
  );

  const { data } = await axios.post<{ links: { rel: string; href: string }[] }>(
    `${base}/v2/checkout/orders`,
    {
      intent: 'CAPTURE',
      purchase_units: [{ amount: { value: amount.toString(), currency_code: currency } }],
    },
    { headers: { Authorization: `Bearer ${token.access_token}`, 'Content-Type': 'application/json' } }
  );

  const approval = data.links.find((l) => l.rel === 'approve');
  return approval?.href;
};

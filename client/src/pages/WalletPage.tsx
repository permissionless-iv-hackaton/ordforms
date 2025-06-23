import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const WalletPage: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get('id');
  const [cost, setCost] = useState<number>();
  const [hash, setHash] = useState('');
  const [wallet, setWallet] = useState('');
  const [ordAddress, setOrdAddress] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const { data } = await axios.get<{ data: { cost: number; contentHash: string } }>(
        `/api/submission/${id}`
      );
      setCost(data.data.cost);
      setHash(data.data.contentHash);
    };
    load();
  }, [id]);

  const connect = async () => {
    try {
      const provider = (window as any).bitcoin || (window as any).xverse;
      if (!provider) return alert('Xverse extension not found');
      const resp = await provider.request('getAddresses');
      const addr = resp.addresses[0].address;
      setWallet(addr);
      await axios.post('/api/bitcoin/wallet/link', { userId: id, pubkey: addr });
    } catch {
      alert('Wallet connect failed');
    }
  };

  const storeOrdinals = async () => {
    if (!ordAddress || !id) return;
    await axios.post('/api/bitcoin/ordinals/store', { userId: id, ordAddress });
    navigate(`/timestamp?id=${id}`);
  };

  return (
    <div className="form-page">
      <h1>Connect Wallet</h1>
      {cost && <p>Inscription Cost: {cost} sats</p>}
      <button onClick={connect}>Connect Xverse</button>
      {wallet && <p>Wallet: {wallet}</p>}
      <input
        value={ordAddress}
        onChange={(e) => setOrdAddress(e.target.value)}
        placeholder="Ordinals address"
      />
      <button onClick={storeOrdinals}>Proceed to Timestamp</button>
      <p>
        Need an inscription? Follow the{' '}
        <a href="https://github.com/ordinalsbot/ordinals-template-app" target="_blank" rel="noopener noreferrer">
          OrdinalsBot template
        </a>{' '}
        or visit <a href="https://ordinalsbot.com/faq" target="_blank" rel="noopener noreferrer">support</a>.
      </p>
    </div>
  );
};

export default WalletPage;

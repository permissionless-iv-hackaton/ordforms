import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormData {
  user: {
    name: string;
    surname: string;
    username: string;
    dob: string;
    nationality: string;
    gender: string;
  };
  githubUser: {
    name: string;
    surname: string;
    username: string;
    avatar: string;
    email: string;
  };
  fileName: string;
}

const WalletPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [cost, setCost] = useState<number>();
  const [hash, setHash] = useState('');
  const [wallet, setWallet] = useState('');
  const [ordAddress, setOrdAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get form data from sessionStorage
    const storedFormData = sessionStorage.getItem('formData');
    if (!storedFormData) {
      // Redirect back to form if no data
      navigate('/form');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedFormData);
      setFormData(parsedData);
    } catch (error) {
      console.error('Error parsing form data:', error);
      navigate('/form');
    }
  }, [navigate]);

  const connect = async () => {
    try {
      const provider = (window as any).bitcoin || (window as any).xverse;
      if (!provider) return alert('Xverse extension not found');
      const resp = await provider.request('getAddresses');
      const addr = resp.addresses[0].address;
      setWallet(addr);
    } catch {
      alert('Wallet connect failed');
    }
  };

  const submitForm = async () => {
    if (!formData || !ordAddress) return;
    
    setLoading(true);
    try {
      // Here you would submit the form data to your backend
      // For now, we'll just navigate to the next step
      console.log('Submitting form data:', formData);
      console.log('Ordinals address:', ordAddress);
      
      // Navigate to timestamp page (you can add an ID here if needed)
      navigate('/timestamp');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Form submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-page">
      <h1>Connect Xverse Wallet</h1>
      <p>Welcome, {formData.user.name} {formData.user.surname}!</p>
      <p>Document: {formData.fileName}</p>
      
      <button onClick={connect}>Connect Xverse</button>
      {wallet && <p>Wallet: {wallet}</p>}
      
      <input
        value={ordAddress}
        onChange={(e) => setOrdAddress(e.target.value)}
        placeholder="Ordinals address"
      />
      
      <button 
        onClick={submitForm} 
        disabled={!ordAddress || loading}
        className="submit-button"
      >
        {loading ? 'Processing...' : 'Proceed to Timestamp'}
      </button>
      
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

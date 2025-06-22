import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/submission/verify-voucher', { code });
      if (response.data.valid) navigate('/form');
      else setError('Invalid voucher');
    } catch {
      setError('Invalid voucher');
    }
  };

  return (
    <div className="voucher-screen">
      <h1>Enter Voucher Code</h1>
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="PERMISSIONLESS" />
      <button onClick={handleSubmit}>Access Form</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
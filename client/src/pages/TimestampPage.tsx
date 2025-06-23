import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TimestampPage: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get('id');
  const [hash, setHash] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const { data } = await axios.get<{ data: { contentHash: string } }>(
        `/api/submission/${id}`
      );
      setHash(data.data.contentHash);
    };
    load();
  }, [id]);

  const push = async () => {
    if (!hash) return;
    await axios.post('/api/bitcoin/opreturn/push', { hash });
    navigate('/success');
  };

  return (
    <div className="form-page">
      <h1>Finalize Submission</h1>
      {hash && <p>Hash: {hash}</p>}
      <button onClick={push}>Record on Bitcoin</button>
    </div>
  );
};

export default TimestampPage;

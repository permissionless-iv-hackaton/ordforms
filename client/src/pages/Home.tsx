import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CaseStudy from './CaseStudy';
import '../styles/main.scss';

const Home: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post<{ valid: boolean }>(
        '/api/submission/verify-voucher',
        { code }
      );
      if (data.valid) {
        setShowCaseStudy(true);
      } else {
        setError('Invalid voucher');
      }
    } catch {
      setError('Invalid voucher');
    }
  };

  const handleCloseCaseStudy = () => {
    setShowCaseStudy(false);
  };

  const handleProceedToForm = () => {
    setShowCaseStudy(false);
    navigate('/form');
  };

  return (
    <div className="voucher-screen">
      <h1>Enter Voucher Code</h1>
      <input value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleSubmit}>View Case Study</button>
      {error && <p>{error}</p>}
      
      {showCaseStudy && (
        <div className="modal-overlay" onClick={handleCloseCaseStudy}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseCaseStudy}>
              ×
            </button>
            <CaseStudy />
            <div className="modal-actions">
              <button onClick={handleCloseCaseStudy} className="btn-secondary">
                Close
              </button>
              <button onClick={handleProceedToForm} className="btn-primary">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

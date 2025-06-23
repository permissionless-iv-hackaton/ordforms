import React from 'react';

const Success: React.FC = () => (
  <div className="success-screen">
    <h1>🎉 Submission Successful!</h1>
    <p>Thank you for participating in the Permissionless Tender Program.</p>
    <p>
      Need help with inscriptions? Visit the{' '}
      <a href="https://support.ordinalsbot.com" target="_blank" rel="noopener noreferrer">
        OrdinalsBot Support Center
      </a>
      .
    </p>
  </div>
);

export default Success;

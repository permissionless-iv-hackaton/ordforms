import React from 'react';
import { Link } from 'react-router-dom';

const randomCase = () => {
  const examples = [
    'Community garden initiative receives funding to expand urban farms.',
    'Open-source privacy tool recognized for empowering activists globally.',
    'Youth coding workshop granted resources to reach remote villages.'
  ];
  return examples[Math.floor(Math.random() * examples.length)];
};

const CaseStudy: React.FC = () => (
  <div className="case-study">
    <h1>Hackathon Grant Opportunity</h1>
    <p>{randomCase()}</p>
    <p>This program mirrors the PayPal Employees grant selection, giving builders a chance to receive funding for impactful work.</p>
    <Link to="/form">Apply Now</Link>
  </div>
);

export default CaseStudy;

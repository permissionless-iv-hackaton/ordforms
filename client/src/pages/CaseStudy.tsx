import React from 'react';
import '../styles/main.scss';

const CaseStudy: React.FC = () => (
  <div className="case-study">
    <h1>Web3 Innovation Hackathon</h1>
    
    <div className="bounty-description">
      <h2>🏆 $50,000+ in Bounties Available</h2>
      
      <p className="main-description">
        Join the future of decentralized innovation! This Web3 hackathon challenges developers, designers, and entrepreneurs to build groundbreaking products that leverage blockchain technology, smart contracts, and decentralized principles. Whether you're creating DeFi protocols, NFT marketplaces, DAO governance tools, or cross-chain bridges, your innovation could earn you significant bounties while contributing to the Web3 ecosystem.
      </p>
      
      <div className="bounty-categories">
        <h3>🎯 Bounty Categories:</h3>
        <ul>
          <li><strong>DeFi Innovation ($15,000):</strong> Lending protocols, yield farming tools, DEXs</li>
          <li><strong>NFT & Digital Assets ($12,000):</strong> Marketplaces, minting platforms, fractional ownership</li>
          <li><strong>DAO Infrastructure ($10,000):</strong> Governance tools, voting mechanisms, treasury management</li>
          <li><strong>Cross-Chain Solutions ($8,000):</strong> Bridges, interoperability protocols, multi-chain apps</li>
          <li><strong>Privacy & Security ($5,000):</strong> Zero-knowledge proofs, privacy-preserving protocols</li>
        </ul>
      </div>
      
      <div className="web3-principles">
        <h3>🌐 Web3 Principles We Value:</h3>
        <ul>
          <li><strong>Decentralization:</strong> Remove single points of failure and central authorities</li>
          <li><strong>Transparency:</strong> Open-source code and verifiable on-chain operations</li>
          <li><strong>User Ownership:</strong> Users control their data, assets, and digital identity</li>
          <li><strong>Interoperability:</strong> Seamless interaction between different blockchain networks</li>
        </ul>
      </div>
      
      <div className="submission-requirements">
        <h3>📋 Submission Requirements:</h3>
        <ul>
          <li>Working prototype with clear Web3 integration</li>
          <li>Open-source codebase with documentation</li>
          <li>Demonstration of blockchain principles and smart contract usage</li>
          <li>Clear value proposition and potential for adoption</li>
        </ul>
      </div>
      
      <div className="timeline">
        <h3>⏰ Timeline:</h3>
        <ul>
          <li><strong>Registration Deadline:</strong> Submit your project details and team information</li>
          <li><strong>Development Phase:</strong> 4 weeks to build and iterate your Web3 solution</li>
          <li><strong>Submission Deadline:</strong> Deploy your smart contracts and submit your application</li>
          <li><strong>Judging & Awards:</strong> Expert panel review and bounty distribution</li>
        </ul>
      </div>
    </div>
    
    <div className="cta-section">
      <p className="cta-text">
        Ready to build the future of Web3? Submit your innovative project and compete for substantial bounties while contributing to the decentralized ecosystem.
      </p>
    </div>
  </div>
);

export default CaseStudy;

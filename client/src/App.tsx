import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import WalletPage from './pages/WalletPage';
import TimestampPage from './pages/TimestampPage';
import CaseStudy from './pages/CaseStudy';
import Success from './pages/Success';
import './styles/main.scss';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/case" element={<CaseStudy />} />
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/timestamp" element={<TimestampPage />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  </Router>
);

export default App;

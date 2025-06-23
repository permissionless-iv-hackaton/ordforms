import React, { useState } from 'react';
import axios from 'axios';

const FormPage: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const githubLogin = () => {
    window.location.href = '/api/auth/github';
  };

  const parseFile = async (f: File) => {
    try {
      const form = new FormData();
      form.append("document", f);
      const { data } = await axios.post<{ name?: string; surname?: string }>("/api/submission/parse", form);
      if (data.name) setName(data.name);
      if (data.surname) setSurname(data.surname);
    } catch (error) {
      console.error('File parsing error:', error);
      setError('Failed to parse file. Please check if it\'s a valid PDF.');
    }
  };

  const handleFile = (f: File) => {
    setFile(f);
    setError('');
    parseFile(f);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a document');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const form = new FormData();
      form.append('name', name);
      form.append('surname', surname);
      form.append('dob', dob);
      form.append('nationality', nationality);
      form.append('gender', gender);
      form.append('document', file);
      
      const { data } = await axios.post<{ id: string }>('/api/submission/create', form);
      window.location.href = `/wallet?id=${data.id}`;
    } catch (error: any) {
      console.error('Submission error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Submission failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <h1>Submission Form</h1>
      <button onClick={githubLogin}>Login with GitHub</button>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" />
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      <select value={nationality} onChange={(e) => setNationality(e.target.value)}>
        <option value="">Select nationality</option>
        <option value="US">US</option>
        <option value="UK">UK</option>
        <option value="CA">CA</option>
      </select>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="na">Prefer not to say</option>
      </select>
      <input type="file" onChange={(e) => handleFile(e.target.files?.[0] as File)} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </div>
  );
};

export default FormPage;

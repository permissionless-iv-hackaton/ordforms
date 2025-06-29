import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/formPage.scss';

interface User {
  name: string;
  surname: string;
  username: string;
  dob: string;
  nationality: string;
  gender: string;
}

interface GitHubUser {
  name: string;
  surname: string;
  username: string;
  avatar: string;
  email: string;
}

interface FormState {
  user: User;
  file: File | null;
  loading: boolean;
  githubUser: GitHubUser | null;
  submissionAttempted: boolean;
}

const FormPage: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    user: {
      name: '',
      surname: '',
      username: '',
      dob: '',
      nationality: '',
      gender: ''
    },
    file: null,
    loading: false,
    githubUser: null,
    submissionAttempted: false
  });

  // Check for GitHub user data in URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const githubUserParam = urlParams.get('github_user');
    
    if (githubUserParam) {
      try {
        const githubUser: GitHubUser = JSON.parse(decodeURIComponent(githubUserParam));
        console.log('Received GitHub user data:', githubUser);
        
        setFormState(prev => ({
          ...prev,
          githubUser,
          user: {
            ...prev.user,
            username: githubUser.username || prev.user.username,
            name: githubUser.name || prev.user.name,
            surname: githubUser.surname || prev.user.surname
          }
        }));
        
        // Log what was actually populated
        console.log('Auto-populated fields:', {
          username: githubUser.username || 'not provided',
          name: githubUser.name || 'not provided',
          surname: githubUser.surname || 'not provided'
        });
        
        // Clear the URL parameter to avoid re-populating on refresh
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      } catch (error) {
        console.error('Error parsing GitHub user data:', error);
      }
    }
  }, []);

  const updateUser = (field: keyof User, value: string) => {
    setFormState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        [field]: value
      }
    }));
  };

  const updateFormState = (field: keyof Omit<FormState, 'user'>, value: any) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const githubLogin = () => {
    window.location.href = '/api/auth/github';
  };

  const parseFile = async (f: File) => {
    try {
      const form = new FormData();
      form.append("document", f);
      const { data } = await axios.post<{ name?: string; surname?: string }>("/api/submission/parse", form);
      
      if (data.name) updateUser('name', data.name);
      if (data.surname) updateUser('surname', data.surname);
    } catch (error) {
      console.error('File parsing error:', error);
    }
  };

  const handleFile = (f: File) => {
    // Check file format immediately
    if (f.type !== 'application/pdf') {
      console.error('Invalid file format. Only PDF files are accepted.');
      return; // Don't set the file if it's not a PDF
    }
    
    updateFormState('file', f);
    parseFile(f);
  };

  const handleSubmit = async () => {
    // Set submission attempted flag
    updateFormState('submissionAttempted', true);
    
    // Check GitHub authentication first
    if (!formState.githubUser) {
      return;
    }
    
    // Check all required fields including file
    const requiredFields = ['name', 'surname', 'username', 'dob', 'nationality', 'gender'];
    const missingFields = requiredFields.filter(field => !formState.user[field as keyof User]);
    
    if (missingFields.length > 0) {
      return;
    }
    
    if (!formState.file) {
      return;
    }
    
    // Check file format
    if (formState.file.type !== 'application/pdf') {
      return;
    }
    
    // All validations passed, navigate to wallet page
    // Store form data in sessionStorage for the next page
    const formData = {
      user: formState.user,
      githubUser: formState.githubUser,
      fileName: formState.file?.name
    };
    sessionStorage.setItem('formData', JSON.stringify(formData));
    
    // Navigate to wallet page
    window.location.href = '/wallet';
  };

  // Check if all required fields are filled
  const isFormComplete = () => {
    const requiredFields = ['name', 'surname', 'username', 'dob', 'nationality', 'gender'];
    const allFieldsFilled = requiredFields.every(field => !!formState.user[field as keyof User]);
    const fileSelected = !!formState.file;
    const fileIsPdf = formState.file?.type === 'application/pdf';
    const githubAuthenticated = !!formState.githubUser;
    return allFieldsFilled && fileSelected && fileIsPdf && githubAuthenticated;
  };

  return (
    <div className="form-page">
      <h1>Submission Form</h1>
      <p className="required-note">
        All fields marked with * are required
      </p>
      
      {formState.githubUser ? (
        <div className="github-login-section">
          <div className="github-user-info">
            {formState.githubUser.avatar && (
              <img 
                src={formState.githubUser.avatar} 
                alt="GitHub Avatar" 
                className="github-avatar"
              />
            )}
            <div className="github-details">
              <div className="github-username">Logged in as: {formState.githubUser.username}</div>
              {formState.githubUser.email && (
                <div className="github-email">
                  {formState.githubUser.email}
                </div>
              )}
            </div>
          </div>
          <div className="github-success-message">
            ✓ GitHub data has been used to pre-fill your username
            {formState.githubUser?.name && ' and name'}
          </div>
        </div>
      ) : (
        <button 
          onClick={githubLogin}
          className="github-login-button"
        >
          Login with GitHub
        </button>
      )}
      
      <input 
        value={formState.user.name} 
        onChange={(e) => updateUser('name', e.target.value)} 
        placeholder="Name *" 
        required
        className={!formState.user.name ? 'error' : 'valid'}
      />
      
      <input 
        value={formState.user.surname} 
        onChange={(e) => updateUser('surname', e.target.value)} 
        placeholder="Surname *" 
        required
        className={!formState.user.surname ? 'error' : 'valid'}
      />
      
      <input 
        value={formState.user.username} 
        onChange={(e) => updateUser('username', e.target.value)} 
        placeholder="Username *" 
        required
        className={!formState.user.username ? 'error' : 'valid'}
      />
      
      <div className="dob-input-container">
        <input 
          type="date" 
          value={formState.user.dob} 
          onChange={(e) => updateUser('dob', e.target.value)} 
          required
          className={!formState.user.dob ? 'error' : 'valid'}
        />
        <span className="dob-icon">📅</span>
      </div>
      
      <select 
        value={formState.user.nationality} 
        onChange={(e) => updateUser('nationality', e.target.value)}
        required
        className={!formState.user.nationality ? 'error' : 'valid'}
      >
        <option value="">Select nationality *</option>
        <option value="US">US</option>
        <option value="UK">UK</option>
        <option value="CA">CA</option>
      </select>
      
      <select 
        value={formState.user.gender} 
        onChange={(e) => updateUser('gender', e.target.value)}
        required
        className={!formState.user.gender ? 'error' : 'valid'}
      >
        <option value="">Gender *</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="na">Prefer not to say</option>
      </select>
      
      <input 
        type="file" 
        accept=".pdf,application/pdf"
        onChange={(e) => handleFile(e.target.files?.[0] as File)} 
        required
        className={!formState.file ? 'error' : 'valid'}
      />
      
      {/* Form completion status */}
      {formState.submissionAttempted && (
        <div className={`form-completion-status ${isFormComplete() ? 'complete' : 'incomplete'}`}>
          {isFormComplete() ? 
            '' : 
            (() => {
              if (!formState.githubUser) {
                return '⚠ Please login with GitHub to continue';
              }
              
              const requiredFields = ['name', 'surname', 'username', 'dob', 'nationality', 'gender'];
              const missingFields = requiredFields.filter(field => !formState.user[field as keyof User]);
              
              if (missingFields.length > 0) {
                return `⚠ Please fill in all required fields: ${missingFields.join(', ')}`;
              }
              
              if (!formState.file) {
                return '⚠ Please select a document to continue';
              }
              
              // Check file format
              if (formState.file.type !== 'application/pdf') {
                return '⚠ Please select a PDF file. Only PDF documents are accepted.';
              }
              
              return '⚠ Please login with GitHub, fill in all required fields and select a document to continue.';
            })()
          }
        </div>
      )}
      
      <button 
        onClick={handleSubmit} 
        disabled={formState.loading}
        className={`next-page-button ${!isFormComplete() ? 'incomplete' : ''}`}
      >
        {formState.loading ? 'Processing...' : 'Next'}
      </button>
    </div>
  );
};

export default FormPage;

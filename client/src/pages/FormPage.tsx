import React, { useState } from 'react';
import './../styles/formPage.scss';

type FormData = {
  name: string;
  dob: string;
  gender: string;
  contact: string;
  github: string;
};

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dob: '',
    gender: '',
    contact: '',
    github: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // submit logic here
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>

      <label>
        Date of Birth:
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
      </label>

      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="nonbinary">Non-binary</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Contact:
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
      </label>

      <label>
        GitHub Account:
        <input type="text" name="github" value={formData.github} onChange={handleChange} required />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormPage;

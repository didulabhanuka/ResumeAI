import { useState } from 'react';
import api from '../api/axios';

export const useScreener = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const screen = async ({ jobDescription, resumeText, resumeFile }) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('jobDescription', jobDescription);

      if (resumeFile) {
        formData.append('resume', resumeFile);
      } else {
        formData.append('resumeText', resumeText);
      }

      const res = await api.post('/screener/screen', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, screen };
};
import { useState, useEffect } from 'react';
import {
  getScreenings,
  getCoverLetters,
  deleteScreening,
  deleteCoverLetter,
} from '../api/history.api';

export const useHistory = () => {
  const [screenings, setScreenings] = useState([]);
  const [coverLetters, setCoverLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    setError('');
    try {
      const [sRes, cRes] = await Promise.all([
        getScreenings(),
        getCoverLetters(),
      ]);
      setScreenings(sRes.data.data);
      setCoverLetters(cRes.data.data);
    } catch (err) {
      setError('Failed to load history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const removeScreening = async (id) => {
    await deleteScreening(id);
    setScreenings((prev) => prev.filter((s) => s._id !== id));
  };

  const removeCoverLetter = async (id) => {
    await deleteCoverLetter(id);
    setCoverLetters((prev) => prev.filter((c) => c._id !== id));
  };

  return {
    screenings,
    coverLetters,
    loading,
    error,
    removeScreening,
    removeCoverLetter,
  };
};
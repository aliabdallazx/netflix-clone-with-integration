import { useState, useEffect } from 'react';
import api from '../services/api';

export const useFetchMovies = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        setData([]);
        setLoading(false);
        setError(null);
        return;
      }
      try {
        setLoading(true);
        const response = await api.get(url);
        setData(response.data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
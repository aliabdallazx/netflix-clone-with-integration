import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(true);

  // Initialize auth from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        // quick health check to determine if backend is available
        try {
          await axios.get(`${API_URL}/health`, { timeout: 3000 });
          setBackendAvailable(true);
        } catch (healthErr) {
          console.warn('Backend health check failed, falling back to local dev auth.');
          setBackendAvailable(false);
        }

        const token = localStorage.getItem('authToken');
        if (token) {
          if (backendAvailable) {
            // Verify token with backend
            const response = await axios.post(
              `${API_URL}/auth/verify`,
              {},
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );
            setUser(response.data.user);
            setIsAuthenticated(true);
          } else {
            // if backend not available, try to restore dev user from localStorage
            const devUser = JSON.parse(localStorage.getItem('dev_current_user'));
            if (devUser) {
              setUser(devUser);
              setIsAuthenticated(true);
            }
          }
        }
      } catch (err) {
        console.error('Auth verification failed:', err);
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signup = useCallback(async (firstName, lastName, email, password) => {
    setError(null);
    setLoading(true);
    try {
      if (!backendAvailable) {
        // Local dev fallback: store user locally
        const users = JSON.parse(localStorage.getItem('dev_users') || '[]');
        if (users.find(u => u.email === email)) {
          const msg = 'Email already registered (local)';
          setError(msg);
          throw new Error(msg);
        }

        const newUser = {
          id: Date.now(),
          firstName,
          lastName,
          email,
          password,
          createdAt: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem('dev_users', JSON.stringify(users));
        const token = `dev-${btoa(email + ':' + Date.now())}`;
        localStorage.setItem('authToken', token);
        localStorage.setItem('dev_current_user', JSON.stringify(newUser));
        setUser(newUser);
        setIsAuthenticated(true);
        return { token, user: newUser };
      }

      const response = await axios.post(`${API_URL}/auth/signup`, {
        firstName,
        lastName,
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      setUser(user);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Signup failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      if (!backendAvailable) {
        const users = JSON.parse(localStorage.getItem('dev_users') || '[]');
        const found = users.find(u => u.email === email && u.password === password);
        if (!found) {
          const msg = 'Invalid credentials (local)';
          setError(msg);
          throw new Error(msg);
        }
        const token = `dev-${btoa(email + ':' + Date.now())}`;
        localStorage.setItem('authToken', token);
        localStorage.setItem('dev_current_user', JSON.stringify(found));
        setUser(found);
        setIsAuthenticated(true);
        return { token, user: found };
      }

      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      setUser(user);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `${API_URL}/user/profile`,
        updates,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Update failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const updateAvatar = useCallback(async (avatarUrl) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `${API_URL}/user/avatar`,
        { avatarUrl },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Avatar update failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const uploadAvatar = useCallback(async (file) => {
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await axios.post(
        `${API_URL}/upload/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Update user's avatar URL
      await updateAvatar(response.data.imageUrl);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Upload failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [updateAvatar]);

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    signup,
    login,
    logout,
    updateProfile,
    updateAvatar,
    uploadAvatar,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

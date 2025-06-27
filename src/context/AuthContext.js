import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Load user
  const loadUser = async () => {
    try {
      setAuthToken(token);
      const res = await axios.get('/api/auth/me');
      setUser(res.data);
    } catch (err) {
      logout();
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      setToken(res.data.token);
      await loadUser();
      navigate('/');
    } catch (err) {
      throw err.response.data;
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      setToken(res.data.token);
      await loadUser();
      navigate('/');
    } catch (err) {
      throw err.response.data;
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    if (token) loadUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
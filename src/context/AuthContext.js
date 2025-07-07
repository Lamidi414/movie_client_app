import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const setAuthToken = useCallback((token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    navigate('/login');
  }, [navigate, setAuthToken]);

  const loadUser = useCallback(async () => {
    try {
      setAuthToken(token);
      const res = await axios.get('/api/auth/me');
      setUser(res.data);
    } catch (err) {
      logout();
    }
  }, [token, logout, setAuthToken]);

  useEffect(() => {
    if (token) loadUser();
  }, [token, loadUser]);

  const login = useCallback(async (credentials) => {
    try {
      const res = await axios.post('/api/auth/login', credentials);
      setToken(res.data.token);
      await loadUser();
      navigate('/');
    } catch (error) {
      throw error.response.data;
    }
  }, [loadUser, navigate]);

   // Add to your context
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  const addFavorite = (movie) => {
    const newFavorites = [...favorites, movie];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const removeFavorite = (movieId) => {
    const newFavorites = favorites.filter(m => m.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loadUser, favorites, 
    addFavorite, removeFavorite}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
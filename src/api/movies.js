import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_BASE_URL
    : 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Enhanced movie API calls
export const fetchPopularMovies = (page = 1) => API.get(`/movies/popular?page=${page}`);
export const fetchMovieDetails = (id) => API.get(`/movies/${id}`);
export const searchMovies = (query, page = 1) => API.get(`/movies/search?query=${query}&page=${page}`);
export const fetchGenres = () => API.get('/movies/genres');

// Add to favorites
export const addFavorite = (movieId) => API.post('/user/favorites', { movieId });
export const removeFavorite = (movieId) => API.delete(`/user/favorites/${movieId}`);

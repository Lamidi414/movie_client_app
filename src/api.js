import axios from 'axios';

// Create configured axios instance
const API = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000/api' 
    : '/api'
});

// Movie API calls
export const fetchMovies = () => API.get('/movies');
export const fetchMovieDetails = (id) => API.get(`/movies/${id}`);
export const loginUser = (credentials) => API.post('/auth/login', credentials);

// Add more API calls as needed
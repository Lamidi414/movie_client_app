import axios from 'axios';

// Create configured axios instance
const API = axios.create({
  baseURL: '/api', // Uses the proxy we set ('http://localhost:5000/api')
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Movie API calls
export const fetchMovies = () => API.get('/movies');
export const fetchMovieDetails = (id) => API.get(`/movies/${id}`);
export const loginUser = (credentials) => API.post('/auth/login', credentials);

// Add more API calls as needed
// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Grid, 
  Pagination, 
  CircularProgress 
} from '@mui/material';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/movies/popular?page=${page}`);
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Popular Movies</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {movies.map(movie => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(_, value) => setPage(value)} 
          color="primary" 
        />
      </Box>
    </Box>
  );
}
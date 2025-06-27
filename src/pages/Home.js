import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Pagination } from '@mui/material';
import MovieCard from '../components/MovieCard';
import axios from 'axios';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`/api/movies/popular?page=${page}`);
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [page]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Popular Movies</Typography>
      <Grid container spacing={3}>
        {movies.map(movie => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(e, value) => setPage(value)} 
          color="primary" 
        />
      </Box>
    </Box>
  );
}
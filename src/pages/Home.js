import { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../api/movies';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const response = await fetchPopularMovies(page);
        setMovies(prev => [...prev, ...response.data.results]);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load movies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page]);

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Popular Movies
      </Typography>

      <Grid container spacing={3}>
        {movies.map(movie => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card 
              component={Link}
              to={`/movies/${movie.id}`}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none'
              }}
            >
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{ height: 400, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {movie.title}
                </Typography>
                <Typography color="text.secondary">
                  Rating: {movie.vote_average}/10
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
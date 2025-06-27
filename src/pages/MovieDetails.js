import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Button, Chip, Rating } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function MovieDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/movies/${id}`);
        setMovie(res.data);
        
        // Check if movie is in favorites
        if (user) {
          const userRes = await axios.get('/api/auth/me');
          const favorites = userRes.data.favorites.map(fav => fav.tmdbId);
          setIsFavorite(favorites.includes(parseInt(id)));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovie();
  }, [id, user]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`/api/user/favorites/${movie.id}`);
      } else {
        await axios.post('/api/user/favorites', { movieId: movie.id });
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error(err);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            style={{ width: '100%', borderRadius: 8 }} 
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom>{movie.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={movie.vote_average / 2} precision={0.1} readOnly />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
            </Typography>
          </Box>
          <Typography variant="body1" gutterBottom>
            {movie.release_date} • {movie.runtime} mins
          </Typography>
          <Box sx={{ mb: 2 }}>
            {movie.genres.map(genre => (
              <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
          <Typography variant="h6" gutterBottom>Overview</Typography>
          <Typography varivant="body1" paragraph>{movie.overview}</Typography>
          
          {user && (
            <Button 
              variant="contained" 
              color={isFavorite ? 'secondary' : 'primary'}
              onClick={handleFavorite}
              sx={{ mt: 2 }}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
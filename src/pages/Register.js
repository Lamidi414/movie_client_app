import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return setError('Password should be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError('Registration failed: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>

        <TextField
          sx={{ 
            '& .MuiInputBase-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
            '& .MuiInputLabel-root': {
              color: 'text.primary',
            },
            mb: 2
          }}
          // ... other props
        />
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />


        <TextField
          sx={{ 
            '& .MuiInputBase-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
            '& .MuiInputLabel-root': {
              color: 'text.primary',
            },
            mb: 2
          }}
          // ... other props
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          sx={{ 
            '& .MuiInputBase-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
            '& .MuiInputLabel-root': {
              color: 'text.primary',
            },
            mb: 2
          }}
          // ... other props
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Box>
      <Typography align="center">
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Container>
  );
}
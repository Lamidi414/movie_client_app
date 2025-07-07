// src/pages/NotFound.js
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material'; // Removed unused Box import

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <Typography variant="h3">404 - Page Not Found</Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="contained" 
        sx={{ mt: 3 }}
      >
        Go Home
      </Button>
    </div>
  );
}
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Logout } from '@mui/icons-material';

export default function Profile() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h4">{user?.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Account Details
      </Typography>
      <List>
        <ListItem>
          <ListItemText 
            primary="Member since" 
            secondary={new Date(user?.createdAt).toLocaleDateString()} 
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Favorite Movies" 
            secondary={user?.favorites?.length || 0} 
          />
        </ListItem>
      </List>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}
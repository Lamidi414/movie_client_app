import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import NotFound from './pages/NotFound';

// Simple error fallback component
function ErrorFallback({ error }) {
  return (
    <div style={{
      padding: '20px',
      background: '#ffecec',
      border: '1px solid red',
      borderRadius: '4px',
      margin: '20px'
    }}>
      <h3>Something went wrong:</h3>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Login />
          </ErrorBoundary>
        } 
      />

      <Route 
        path="/register" 
        element={
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Register />
          </ErrorBoundary>
        } 
      />

      <Route 
        path="/profile" 
        element={
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Profile />
          </ErrorBoundary>
        } 
      />

      <Route 
        path="/" 
        element={
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Home />
          </ErrorBoundary>
        } 
      />
      
      <Route 
        path="/movies/:id" 
        element={
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <MovieDetails />
          </ErrorBoundary>
        } 
      />
      
      <Route 
        path="*" 
        element={<NotFound />} 
      />
    </Routes>
  );
}

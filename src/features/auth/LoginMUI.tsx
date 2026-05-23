import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
} from '@mui/material';
import { useAuth } from './AuthContext';

export function LoginMUI() {
  const { state, dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch(`http://localhost:4000/users?email=${email}`);
      const users = await response.json();

      if (!Array.isArray(users) || users.length === 0) {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'User not found' });
        return;
      }

      const user = users[0];

      if (user.password !== password) {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid password' });
        return;
      }

      const { password: _, ...userWithoutPassword } = user;
      dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error instanceof Error ? error.message : 'Login failed',
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
                variant="outlined"
              />
              {state.error && (
                <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                  {state.error}
                </Alert>
              )}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
                sx={{ mt: 3 }}
                disabled={state.loading}
              >
                {state.loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';

export function LoginBS() {
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
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {state.error && (
              <Alert variant="danger" className="mb-3">
                {state.error}
              </Alert>
            )}
            <Button
              variant="success"
              type="submit"
              className="w-100"
              disabled={state.loading}
            >
              {state.loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

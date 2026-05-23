import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { loginStart, loginSuccess, loginFailure } from './authSlice';
import { setAuthToken } from '../../api/axios';

export function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await fetch(`http://localhost:4000/users?email=${email}`);
      const users = await response.json();

      if (!Array.isArray(users) || users.length === 0) {
        dispatch(loginFailure('User not found'));
        return;
      }

      const user = users[0];

      if (user.password !== password) {
        dispatch(loginFailure('Invalid password'));
        return;
      }

      const { password: _, ...userWithoutPassword } = user;
      const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
      setAuthToken(token);
      dispatch(loginSuccess({ user: userWithoutPassword, token }));
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        {state.error && (
          <div style={{ color: 'red', marginBottom: '15px' }}>
            {state.error}
          </div>
        )}
        <button
          type="submit"
          disabled={state.loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: state.loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: state.loading ? 'not-allowed' : 'pointer',
          }}
        >
          {state.loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

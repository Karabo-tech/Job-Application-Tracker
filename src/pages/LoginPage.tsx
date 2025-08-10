import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Button, Card, Input } from '../components';

export const LoginPage: React.FC = () => {
  const { login } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      window.location.hash = 'home';
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <Card>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            value={username}
            onChange={setUsername}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
          {error && (
            <div style={{ color: '#d32f2f', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
          <Button type="submit" size="lg" style={{ width: '100%' }}>
            Sign In
          </Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
          Don't have an account?{' '}
          <a href="#register" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Register here
          </a>
        </p>
      </Card>
    </div>
  );
};
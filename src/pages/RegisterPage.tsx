import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Button, Card, Input } from '../components';

export const RegisterPage: React.FC = () => {
  const { register } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (register(username, password)) {
      window.location.hash = 'home';
    } else {
      setError('Username already exists');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <Card>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>Create Account</h2>
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
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            required
          />
          {error && (
            <div style={{ color: '#d32f2f', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
          <Button type="submit" size="lg" style={{ width: '100%' }}>
            Create Account
          </Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
          Already have an account?{' '}
          <a href="#login" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Sign in here
          </a>
        </p>
      </Card>
    </div>
  );
};
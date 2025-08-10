import React from 'react';
import { Button } from '../components';

export const NotFoundPage: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '4rem' }}>
    <h1 style={{ fontSize: '6rem', color: '#1976d2', margin: 0 }}>404</h1>
    <h2 style={{ color: '#333', marginBottom: '1rem' }}>Page Not Found</h2>
    <p style={{ color: '#666', marginBottom: '2rem' }}>
      The page you're looking for doesn't exist.
    </p>
    <Button onClick={() => window.location.hash = 'home'}>
      Go Home
    </Button>
  </div>
);
import React from 'react';
import { Briefcase, Building, Calendar, Users } from 'lucide-react';
import { Button, Card } from '../components';

export const LandingPage: React.FC = () => (
  <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
    <div style={{ marginBottom: '3rem' }}>
      <Briefcase size={64} style={{ color: '#1976d2', marginBottom: '1rem' }} />
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
        JobTracker Pro
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#666', lineHeight: 1.6 }}>
        Take control of your job search journey with our comprehensive application tracking system.
        Never lose track of an opportunity again.
      </p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
      {[
        { icon: Building, title: 'Track Applications', desc: 'Keep detailed records of every job application' },
        { icon: Calendar, title: 'Manage Deadlines', desc: 'Stay organized with application dates and follow-ups' },
        { icon: Users, title: 'Monitor Status', desc: 'Track your application progress from applied to hired' }
      ].map((feature, i) => (
        <Card key={i}>
          <feature.icon size={32} style={{ color: '#1976d2', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{feature.title}</h3>
          <p style={{ color: '#666' }}>{feature.desc}</p>
        </Card>
      ))}
    </div>

    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <Button onClick={() => window.location.hash = 'register'} size="lg">
        Get Started
      </Button>
      <Button onClick={() => window.location.hash = 'login'} variant="secondary" size="lg">
        Sign In
      </Button>
    </div>
  </div>
);
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className, style = {} }) => (
  <div
    className={className}
    style={{
      backgroundColor: '#3b80e1ff',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '3px solid #1976d2',
      ...style
    }}
  >
    {children}
  </div>
);
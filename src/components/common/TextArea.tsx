import React from 'react';

interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  style?: React.CSSProperties;
}

export const TextArea: React.FC<TextAreaProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  rows = 3,
  style = {}
}) => (
  <div style={{ marginBottom: '1rem' }}>
    {label && (
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
        {label}
      </label>
    )}
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
        fontFamily: 'inherit',
        resize: 'vertical',
        boxSizing: 'border-box',
        ...style
      }}
    />
  </div>
);
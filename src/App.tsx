import React from 'react';
import { AppProvider } from './context/AppProvider';
import { Router } from './Router';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;
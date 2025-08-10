import React, { useState, useEffect } from 'react';
import { Layout } from './components';
import { 
  LandingPage, 
  LoginPage, 
  RegisterPage, 
  HomePage, 
  JobDetailPage, 
  NotFoundPage 
} from './pages';

export const Router: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(window.location.hash.replace('#', '') || 'landing');

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace('#', '') || 'landing';
      setCurrentPage(page.split('?')[0]); // Remove query params for page detection
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Set initial page
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'home':
        return <HomePage />;
      case 'job':
        return <JobDetailPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
};
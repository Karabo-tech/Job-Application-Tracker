import React, { useState, useEffect } from 'react';
import { User, LogOut, Briefcase, FileText } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAppContext();
  const [currentPage, setCurrentPage] = useState(window.location.hash.replace('#', '') || 'home');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash.replace('#', '') || 'home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (!currentUser && !['login', 'register', 'landing'].includes(currentPage)) {
    window.location.hash = 'login';
    return null;
  }

  const navigation = [
    { key: 'landing', label: 'About', icon: FileText },
    { key: 'home', label: 'My Jobs', icon: Briefcase },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#38beefc1',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <header style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Job Application Tracker - (JAT)</h1>
          
          <nav style={{ display: 'flex', gap: '1rem' }}>
            {navigation.map(({ key, label, icon: Icon }) => (
              <a
                key={key}
                href={`#${key}`}
                style={{
                  color: currentPage === key ? '#fff' : 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  backgroundColor: currentPage === key ? 'rgba(255,255,255,0.1)' : 'transparent',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentPage === key ? 'rgba(255,255,255,0.1)' : 'transparent'}
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {currentUser ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={16} />
                  {currentUser.username}
                </div>
                <button
                  onClick={logout}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a href="#login" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Login</a>
                <a href="#register" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Register</a>
              </div>
            )}
          </div>
        </div>
      </header>

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
};
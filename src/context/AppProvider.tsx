import React, { useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import type { User, Job, AppContextType } from '../types';
import { generateId, getStoredData, setStoredData } from '../utils/storage';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => getStoredData('users', []));
  const [currentUser, setCurrentUser] = useState<User | null>(() => getStoredData('currentUser', null));
  const [jobs, setJobs] = useState<Job[]>(() => getStoredData('jobs', []));

  useEffect(() => {
    setStoredData('users', users);
  }, [users]);

  useEffect(() => {
    setStoredData('currentUser', currentUser);
  }, [currentUser]);

  useEffect(() => {
    setStoredData('jobs', jobs);
  }, [jobs]);

  const login = (username: string, password: string): boolean => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    window.location.hash = 'landing';
  };

  const register = (username: string, password: string): boolean => {
    if (users.find(u => u.username === username)) {
      return false;
    }
    const newUser: User = {
      id: generateId(),
      username,
      password
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const addJob = (jobData: Omit<Job, 'id' | 'userId'>) => {
    if (!currentUser) return;
    const newJob: Job = {
      ...jobData,
      id: generateId(),
      userId: currentUser.id
    };
    setJobs([...jobs, newJob]);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, ...updates } : job));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const userJobs = jobs.filter(job => job.userId === currentUser?.id);

  const contextValue: AppContextType = {
    currentUser,
    login,
    logout,
    register,
    jobs: userJobs,
    addJob,
    updateJob,
    deleteJob
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
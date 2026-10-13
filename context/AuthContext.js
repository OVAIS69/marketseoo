'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const defaultUser = {
  id: 'user_alex_morgan',
  name: 'Alex Morgan',
  email: 'alex@marketlearn.dev',
  role: 'USER',
  xp: 420,
  level: 'Learner',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  businessProfile: {
    businessName: 'Artisan Roast Coffee Co.',
    industry: 'Retail & Specialty Food',
    website: 'https://artisanroast.example.com',
    stage: 'Growing',
    growthScore: 72,
    monthlyBudget: 850,
  },
};

export const adminUser = {
  id: 'user_admin',
  name: 'Sarah Jenkins',
  email: 'admin@marketlearn.dev',
  role: 'ADMIN',
  xp: 1250,
  level: 'Growth Expert',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
  businessProfile: {
    businessName: 'Apex Growth Advisors',
    industry: 'Consulting & Marketing',
    website: 'https://apexgrowth.example.com',
    stage: 'Established',
    growthScore: 94,
    monthlyBudget: 3500,
  },
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load from localStorage if present
    const savedUser = localStorage.getItem('marketlearn_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
  }, []);

  const login = (email, password) => {
    if (email.toLowerCase().includes('admin')) {
      setCurrentUser(adminUser);
      localStorage.setItem('marketlearn_user', JSON.stringify(adminUser));
      setIsAuthenticated(true);
      return { success: true, user: adminUser };
    } else {
      const userToSet = { ...defaultUser, email: email || defaultUser.email };
      setCurrentUser(userToSet);
      localStorage.setItem('marketlearn_user', JSON.stringify(userToSet));
      setIsAuthenticated(true);
      return { success: true, user: userToSet };
    }
  };

  const register = (userData) => {
    const newUser = {
      id: 'user_' + Date.now(),
      name: userData.name || 'New Business Owner',
      email: userData.email,
      role: 'USER',
      xp: 100,
      level: 'Beginner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      businessProfile: {
        businessName: userData.businessName || 'My Small Business',
        industry: userData.industry || 'General Commerce',
        website: userData.website || '',
        stage: 'Startup',
        growthScore: 50,
        monthlyBudget: userData.monthlyBudget ? Number(userData.monthlyBudget) : 300,
      },
    };
    setCurrentUser(newUser);
    localStorage.setItem('marketlearn_user', JSON.stringify(newUser));
    setIsAuthenticated(true);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('marketlearn_user');
  };

  const switchAccount = (role) => {
    if (role === 'ADMIN') {
      setCurrentUser(adminUser);
      localStorage.setItem('marketlearn_user', JSON.stringify(adminUser));
      setIsAuthenticated(true);
    } else {
      setCurrentUser(defaultUser);
      localStorage.setItem('marketlearn_user', JSON.stringify(defaultUser));
      setIsAuthenticated(true);
    }
  };

  const addXP = (points) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const updatedXP = (prev.xp || 0) + points;
      let newLevel = prev.level;
      if (updatedXP >= 1000) newLevel = 'Growth Expert';
      else if (updatedXP >= 600) newLevel = 'Digital Marketer';
      else if (updatedXP >= 300) newLevel = 'Learner';
      else newLevel = 'Beginner';

      const updated = { ...prev, xp: updatedXP, level: newLevel };
      localStorage.setItem('marketlearn_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        switchAccount,
        addXP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const SESSION_KEY = 'nexor_biosite_admin_session';
const DEFAULT_ADMIN_PASSWORD = 'asd123';

function getAdminPassword() {
  return import.meta.env.VITE_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem(SESSION_KEY) === 'ok');
    setIsLoadingAuth(false);
  }, []);

  const signIn = async (password) => {
    if (String(password || '') !== getAdminPassword()) {
      throw new Error('Senha invalida');
    }
    sessionStorage.setItem(SESSION_KEY, 'ok');
    setIsAuthenticated(true);
    return true;
  };

  const logout = async () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  const value = useMemo(() => ({
    user: isAuthenticated ? { role: 'admin' } : null,
    isAuthenticated,
    isLoadingAuth,
    signIn,
    logout,
    refreshUser: () => setIsAuthenticated(sessionStorage.getItem(SESSION_KEY) === 'ok'),
  }), [isAuthenticated, isLoadingAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

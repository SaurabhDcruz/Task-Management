import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { createAuthToken } from '../utils/helpers';
import { mockUsers } from '../data/mockUsers';
import { storageService } from '../services/storageService';

export const AuthContext = createContext({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storageService.getAuthUser());
  const [token, setToken] = useState(storageService.getAuthToken());

  const logout = useCallback(() => {
    storageService.clearAuthUser();
    storageService.clearAuthToken();
    storageService.clearRememberMe();
    setUser(null);
    setToken(null);
  }, []);

  const login = useCallback(async ({ email, password, remember }) => {
    const sanitizedEmail = email.trim().toLowerCase();
    const foundUser = mockUsers.find(
      (item) => item.email === sanitizedEmail && item.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const authToken = createAuthToken(foundUser.email);
    const authPayload = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
    };

    storageService.setAuthUser(authPayload);
    storageService.setAuthToken(authToken);
    storageService.setRememberMe(remember);

    setUser(authPayload);
    setToken(authToken);
    return authPayload;
  }, []);

  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key === 'auth_user' || event.key === 'auth_token') {
        const nextUser = storageService.getAuthUser();
        const nextToken = storageService.getAuthToken();
        if (!nextUser || !nextToken) {
          logout();
        } else {
          setUser(nextUser);
          setToken(nextToken);
        }
      }
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [logout]);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isAuthenticated: Boolean(user && token),
    }),
    [user, token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

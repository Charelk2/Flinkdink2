import React, { useState } from 'react';
import { AuthContext, AUTH_KEY, getBaseUrl } from './authHelpers';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(AUTH_KEY));

  const baseUrl = getBaseUrl();

  const login = async (email, password) => {
    const res = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const message = await res.text();
      console.error('Login failed', message);
      throw new Error(message || `HTTP ${res.status}`);
    }
    const data = await res.json();
    setToken(data.token);
    localStorage.setItem(AUTH_KEY, data.token);
  };

  const register = async (email, password) => {
    const res = await fetch(`${baseUrl}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const message = await res.text();
      console.error('Registration failed', message);
      throw new Error(message || `HTTP ${res.status}`);
    }
    const data = await res.json();
    setToken(data.token);
    localStorage.setItem(AUTH_KEY, data.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};


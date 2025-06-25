import React, { useState } from 'react';
import { AuthContext, AUTH_KEY, getBaseUrl } from './authHelpers';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(AUTH_KEY));

  const baseUrl = getBaseUrl();

  const parseError = async (res, context) => {
    const text = await res.text();
    let detail;
    try {
      ({ detail } = JSON.parse(text));
    } catch {
      detail = text;
    }
    if (res.status === 422) {
      console.warn(`${context} returned 422`, text);
    }
    const error = new Error(detail || `HTTP ${res.status}`);
    error.detail = detail;
    error.status = res.status;
    return error;
  };

  const login = async (email, password) => {
    const res = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw await parseError(res, 'Login');
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
      throw await parseError(res, 'Registration');
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


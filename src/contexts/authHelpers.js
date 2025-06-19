import { createContext, useContext } from 'react';

export const AUTH_KEY = 'auth-token';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function getBaseUrl() {
  return (
    (import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
    process.env.VITE_API_BASE_URL ||
    ''
  );
}

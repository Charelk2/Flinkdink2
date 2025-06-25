import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/authHelpers';

export default function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      console.error('Registration failed', err);
      setError(err.detail || 'Could not register');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-[env(safe-area-inset-top)] pb-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-xs">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
        {error && <div className="text-red-600" role="alert">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-3 w-full text-lg"
          aria-label="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-3 w-full text-lg"
          aria-label="password"
          required
        />
        <button type="submit" className="btn w-full text-lg">
          Sign Up
        </button>
        <p className="text-sm text-center">
          Already have an account? <Link to="/login" className="underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

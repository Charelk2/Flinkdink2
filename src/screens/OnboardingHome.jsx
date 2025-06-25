import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '../contexts/ProfileProvider';

const EMOJIS = ['🐶', '🐱', '🐰', '🦁', '🐵', '🐸', '🐼', '🦊'];

function randomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

export default function OnboardingHome() {
  const { createProfile } = useProfiles();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [avatar, setAvatar] = useState(randomEmoji());
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!birthday) {
      setError('Birthday is required');
      return;
    }
    const dateVal = new Date(birthday);
    if (Number.isNaN(dateVal.getTime()) || dateVal > new Date()) {
      setError('Invalid date');
      return;
    }
    createProfile({ name: name.trim(), birthday, avatar });
    navigate('/select-kid');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 shadow rounded w-full max-w-xs"
      >
        <h1 className="text-xl font-bold text-center">Let’s add your first explorer!</h1>
        {error && (
          <div className="text-red-600" role="alert">
            {error}
          </div>
        )}
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
        <label htmlFor="dob" className="sr-only">
          Date of Birth
        </label>
        <input
          id="dob"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="border rounded p-2 w-full"
          aria-label="date of birth"
          required
        />
        <div className="flex items-center justify-between">
          <span className="text-3xl" aria-label="avatar">
            {avatar}
          </span>
          <button
            type="button"
            className="underline text-sm"
            onClick={() => setAvatar(randomEmoji())}
          >
            Random Avatar
          </button>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white w-full py-2 rounded"
        >
          Save and Start
        </button>
      </form>
    </div>
  );
}

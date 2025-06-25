import { Link, useNavigate } from 'react-router-dom';
import { useProfiles } from '../contexts/ProfileProvider';
import { getAgeFromBirthday } from '../utils/age';

function displayAge(birthday) {
  const age = getAgeFromBirthday(birthday);
  return Number.isNaN(age) ? '-' : age;
}

export default function KidSelector() {
  const {
    profiles,
    selectProfile,
    deleteProfile,
    editProfile,
  } = useProfiles();
  const navigate = useNavigate();

  const handleSelect = (id) => {
    selectProfile(id);
    navigate('/learning-hub');
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Delete this profile?')) {
      deleteProfile(id);
    }
  };

  const handleEdit = (e, id, name) => {
    e.stopPropagation();
    const newName = window.prompt('New name', name);
    if (newName) {
      editProfile(id, { name: newName });
    }
  };

  return (
    <div className="p-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {profiles.map((p) => (
          <div
            key={p.id}
            role="button"
            tabIndex={0}
            onClick={() => handleSelect(p.id)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSelect(p.id);
            }}
            aria-label={`Select ${p.name}`}
            className="card space-y-1 text-center cursor-pointer"
          >
            <div className="text-6xl" aria-label="avatar">
              {p.avatar}
            </div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600">
              {displayAge(p.birthday)} years
            </div>
            <div className="flex justify-center space-x-2 pt-2">
              <button
                type="button"
                onClick={(e) => handleEdit(e, p.id, p.name)}
                aria-label={`Edit ${p.name}`}
                className="icon-btn hover:bg-gray-200"
              >
                ✏️
              </button>
              <button
                type="button"
                onClick={(e) => handleDelete(e, p.id)}
                aria-label={`Delete ${p.name}`}
                className="icon-btn hover:bg-gray-200"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
        <Link
          to="/onboarding"
          className="card flex items-center justify-center text-xl font-semibold"
        >
          ➕ Add Another Child
        </Link>
      </div>
    </div>
  );
}

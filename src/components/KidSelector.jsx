import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProfiles } from '../contexts/ProfileProvider';
import { getAgeFromBirthday } from '../utils/age';
import EditProfileModal from './EditProfileModal';
import DeleteConfirmModal from './DeleteConfirmModal';

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
  const [editingProfile, setEditingProfile] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const handleSelect = (id) => {
    selectProfile(id);
    navigate('/learning-hub');
  };

  const handleDelete = (e, p) => {
    e.stopPropagation();
    setDeleting(p);
  };

  const handleEdit = (e, p) => {
    e.stopPropagation();
    setEditingProfile(p);
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
            className="card space-y-1 text-center cursor-pointer hover:ring-2 focus:ring-2 ring-blue-500 transition
            focus:outline-none"
          >
            <div className="text-7xl" aria-label="avatar">
              {p.avatar}
            </div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600">
              {displayAge(p.birthday)} years
            </div>
            <div className="flex justify-center space-x-2 pt-2">
              <button
                type="button"
                onClick={(e) => handleEdit(e, p)}
                aria-label={`Edit ${p.name}`}
                className="icon-btn hover:bg-gray-200"
              >
                ✏️
              </button>
              <button
                type="button"
                onClick={(e) => handleDelete(e, p)}
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
          className="card flex items-center justify-center text-xl font-semibold hover:ring-2 focus:ring-2 ring-blue-500
          transition focus:outline-none"
        >
          ➕ Add Another Child
        </Link>
      </div>
      {editingProfile && (
        <EditProfileModal
          isOpen={Boolean(editingProfile)}
          onClose={() => setEditingProfile(null)}
          profile={editingProfile}
          onSave={(updated) => editProfile(editingProfile.id, updated)}
        />
      )}
      {deleting && (
        <DeleteConfirmModal
          open={Boolean(deleting)}
          onClose={() => setDeleting(null)}
          name={deleting.name}
          onConfirm={() => deleteProfile(deleting.id)}
        />
      )}
    </div>
  );
}

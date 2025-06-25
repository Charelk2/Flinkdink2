import { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@headlessui/react';

export default function EditProfileModal({ isOpen, onClose, profile, onSave }) {
  const [name, setName] = useState(profile.name);
  const [birthday, setBirthday] = useState(profile.birthday);
  const [avatar, setAvatar] = useState(profile.avatar || '🐼');

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave({ ...profile, name, birthday, avatar });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center">
      <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg relative z-10">
        <Dialog.Title className="text-xl font-bold mb-4">Edit Profile</Dialog.Title>

        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium">Name</span>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium">Birthday</span>
            <input
              type="date"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium">Avatar (Emoji)</span>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              maxLength={2}
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
}

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    birthday: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

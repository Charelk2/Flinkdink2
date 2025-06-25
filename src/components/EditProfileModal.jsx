import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

export default function EditProfileModal({ open, onClose, profile, onSave }) {
  const [name, setName] = useState(profile.name);
  const [birthday, setBirthday] = useState(profile.birthday || '');
  const [avatar, setAvatar] = useState(profile.avatar || '');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), birthday, avatar });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <h2 className="text-lg font-bold text-center">Edit Profile</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-full"
          aria-label="name"
          required
        />
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="border rounded p-2 w-full"
          aria-label="date of birth"
          required
        />
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="border rounded p-2 w-full"
          aria-label="avatar"
        />
        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}

EditProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    birthday: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

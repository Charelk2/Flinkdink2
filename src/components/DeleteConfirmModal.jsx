import PropTypes from 'prop-types';
import Modal from './Modal';

export default function DeleteConfirmModal({ open, onClose, name, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4 text-center">
        <p>Are you sure you want to delete {name}?</p>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => { onConfirm(); onClose(); }}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

DeleteConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

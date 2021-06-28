import React, { useState } from "react";
import { Modal } from "neetoui";

export default function DeleteAlert({ deleteNotes, onClose, selectedNoteIds }) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = () => {
    setDeleting(true);
    deleteNotes();
    setDeleting(false);
    onClose();
  };
  return (
    <Modal
      isOpen
      size="small"
      autoHeight
      showFooter
      submitButtonProps={{
        style: "danger",
        label: "Delete",
        loading: deleting,
        onClick: handleDelete,
      }}
      onClose={onClose}
    >
      <div className="flex">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-100 rounded-full">
          <i className="text-red-500 ri-alarm-warning-fill ri-lg"></i>
        </div>

        <div className="ml-4">
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            {selectedNoteIds.length > 1
              ? `Delete ${selectedNoteIds.length} notes ?`
              : `Delete Note`}
          </h3>
          <div className="text-sm leading-5 text-gray-500">
            {`Are you sure you want to delete the
            ${
    selectedNoteIds.length > 1 ? `notes` : `note`
    }?. All your data will be
            permanently removed from our database forever. this action cannot be
            undone.`}
          </div>
        </div>
      </div>
    </Modal>
  );
}

import React, { useState } from "react";
import { Alert } from "neetoui";

export default function DeleteAlert({ deleteNotes, onClose, selectedNoteIds }) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = () => {
    setDeleting(true);
    deleteNotes();
    setDeleting(false);
    onClose();
  };
  return (
    <Alert
      isOpen
      hideConfirmation
      icon="text-red-500 ri-alarm-warning-line"
      title={
        selectedNoteIds.length > 1
          ? `Delete ${selectedNoteIds.length} notes ?`
          : `Delete Note`
      }
      message={`Are you sure you want to delete the
      ${selectedNoteIds.length > 1 ? `notes` : `note`}?. All your data will be
      permanently removed from our database forever. this action cannot be
      undone.`}
      submitButtonProps={{
        style: "danger",
        label: "Delete",
        loading: deleting,
        onClick: handleDelete,
      }}
      onClose={onClose}
    />
  );
}

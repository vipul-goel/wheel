import React, { useState } from "react";
import { Alert } from "neetoui";

export default function DeleteAlert({
  deleteContacts,
  onClose,
  selectedContactIds,
}) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = () => {
    setDeleting(true);
    deleteContacts();
    setDeleting(false);
    onClose();
  };
  return (
    <Alert
      isOpen
      hideConfirmation
      icon="text-red-500 ri-alarm-warning-line"
      title={
        selectedContactIds.length > 1
          ? `Delete ${selectedContactIds.length} contacts ?`
          : `Delete contact`
      }
      message={`Are you sure you want to delete the
      ${
    selectedContactIds.length > 1 ? `contacts` : `contact`
    }?. All your data will be
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

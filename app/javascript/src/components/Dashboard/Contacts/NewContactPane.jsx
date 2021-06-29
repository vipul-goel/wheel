import React from "react";
import { Pane } from "neetoui";
import NewContactForm from "./NewContactForm";

import { INITIAL_CONTACT_FORM_VALUES } from "./constants";

export default function NewContactPane({
  addNewContact,
  updateContact,
  isEdit,
  contactData,
  showPane,
  onClose,
}) {
  return (
    <Pane
      title={isEdit ? "Update Contact" : "Add Contact"}
      isOpen={showPane}
      onClose={onClose}
    >
      <div className="px-6">
        <NewContactForm
          onClose={onClose}
          saveChanges={isEdit ? updateContact : addNewContact}
          initialFormValues={isEdit ? contactData : INITIAL_CONTACT_FORM_VALUES}
        />
      </div>
    </Pane>
  );
}

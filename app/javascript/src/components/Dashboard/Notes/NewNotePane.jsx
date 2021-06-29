import React from "react";
import { Pane } from "neetoui";
import NewNoteForm from "./NewNoteForm";

import { INITIAL_NOTE_FORM_VALUES } from "./constants";

export default function NewNotePane({
  addNewNote,
  updateNote,
  isEdit,
  noteData,
  showPane,
  onClose,
}) {
  return (
    <Pane
      title={isEdit ? "Update Note" : "Add Note"}
      isOpen={showPane}
      onClose={onClose}
    >
      <div className="px-6">
        <NewNoteForm
          onClose={onClose}
          saveChanges={isEdit ? updateNote : addNewNote}
          initialFormValues={isEdit ? noteData : INITIAL_NOTE_FORM_VALUES}
        />
      </div>
    </Pane>
  );
}

import React, { useState, useEffect } from "react";
import { Button, PageLoader, Toastr } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";

import NoteTable from "./NoteTable";
import NewNotePane from "./NewNotePane";
import DeleteAlert from "./DeleteAlert";
import { INITIAL_NOTES_DATA } from "./constants";
import { SORT_VALUES_ARRAY, DASHBOARD_PAGINATION_PROPS } from "../constants";

const Notes = () => {
  const [loading, setLoading] = useState(false);
  const [showNewNotePane, setShowNewNotePane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [notes, setNotes] = useState([]);
  const [editNoteData, setEditNoteData] = useState({ show: false, note: null });

  useEffect(() => {
    setLoading(true);
    const notesTimeout = setTimeout(() => {
      setNotes(INITIAL_NOTES_DATA);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(notesTimeout);
  }, []);

  const addNewNote = newNote => {
    newNote.id = notes.length + 1;
    setNotes([...notes, newNote]);
    Toastr.success("New Note added successfully");
  };

  const updateNote = updatedNote => {
    const updatedNotes = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    Toastr.success("Note updated successfully");
  };

  const showUpdateNotePane = note => {
    setEditNoteData({ show: true, note });
    setShowNewNotePane(true);
  };

  const closeNewNotePane = () => {
    setShowNewNotePane(false);
    setEditNoteData({ show: false, note: null });
  };

  const deleteNotes = () => {
    const updatedNotes = notes.filter(
      note => !selectedNoteIds.includes(note.id)
    );
    setNotes(updatedNotes);
    setSelectedNoteIds([]);
    Toastr.success("Note deleted successfully");
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Notes"
        actionBlock={
          <Button
            onClick={() => setShowNewNotePane(true)}
            label="New Note"
            icon="ri-add-line"
          />
        }
      />
      {notes.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedNoteIds.length,
            }}
            sortProps={{
              options: SORT_VALUES_ARRAY,
            }}
            paginationProps={DASHBOARD_PAGINATION_PROPS}
            showMenu={false}
          />
          <NoteTable
            selectedNoteIds={selectedNoteIds}
            setSelectedNoteIds={setSelectedNoteIds}
            setShowDeleteAlert={setShowDeleteAlert}
            showUpdateNotePane={showUpdateNotePane}
            notes={notes}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any notes!"
          subtitle="Add your notes to send customized emails to them."
          primaryAction={() => setShowNewNotePane(true)}
          primaryActionLabel="Add New Note"
        />
      )}
      <NewNotePane
        showPane={showNewNotePane}
        onClose={closeNewNotePane}
        addNewNote={addNewNote}
        updateNote={updateNote}
        isEdit={editNoteData.show}
        noteData={editNoteData.note}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedNoteIds={selectedNoteIds}
          onClose={() => setShowDeleteAlert(false)}
          deleteNotes={deleteNotes}
        />
      )}
    </>
  );
};

export default Notes;

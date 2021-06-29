import React, { useState, useEffect } from "react";
import { Button, PageLoader, Toastr } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";

import ContactsTable from "./ContactsTable";
import NewContactPane from "./NewContactPane";
import DeleteAlert from "./DeleteAlert";
import { INITIAL_CONTACTS_DATA } from "./constants";
import { SORT_VALUES_ARRAY, DASHBOARD_PAGINATION_PROPS } from "../constants";

const Contacts = () => {
  const [loading, setLoading] = useState(false);
  const [showNewContactPane, setShowNewContactPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [editContactData, setEditContactData] = useState({
    show: false,
    contact: null,
  });

  useEffect(() => {
    setLoading(true);
    const contactsTimeout = setTimeout(() => {
      setContacts(INITIAL_CONTACTS_DATA);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(contactsTimeout);
  }, []);

  const addNewContact = newContact => {
    newContact.id = contacts.length + 1;
    setContacts([...contacts, newContact]);
    Toastr.success("New Contact added successfully");
  };

  const updateContact = updatedContact => {
    const updatedContacts = contacts.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
    Toastr.success("Contact updated successfully");
  };

  const showUpdateContactPane = contact => {
    setEditContactData({ show: true, contact });
    setShowNewContactPane(true);
  };

  const closeNewContactPane = () => {
    setShowNewContactPane(false);
    setEditContactData({ show: false, contact: null });
  };

  const toggleContactAddToBasecamp = contactId => {
    let isAdded = true;
    const updatedContacts = contacts.map(contact => {
      if (contact.id === contactId) {
        contact.addToBasecamp = !contact.addToBasecamp;
        isAdded = contact.addToBasecamp;
      }
      return contact;
    });
    setContacts(updatedContacts);
    Toastr.success(`Contact ${isAdded ? "added to" : "removed from"} bootcamp`);
  };

  const deleteContacts = () => {
    const updatedContacts = contacts.filter(
      contact => !selectedContactIds.includes(contact.id)
    );
    setContacts(updatedContacts);
    setSelectedContactIds([]);
    Toastr.success("Contact deleted successfully");
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Contacts"
        actionBlock={
          <Button
            label="New Contact"
            icon="ri-add-line"
            onClick={() => setShowNewContactPane(true)}
          />
        }
      />
      {contacts.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedContactIds.length,
            }}
            sortProps={{
              options: SORT_VALUES_ARRAY,
            }}
            paginationProps={DASHBOARD_PAGINATION_PROPS}
            showMenu={false}
          />
          <ContactsTable
            selectedContactIds={selectedContactIds}
            setSelectedContactIds={setSelectedContactIds}
            setShowDeleteAlert={setShowDeleteAlert}
            showUpdateContactPane={showUpdateContactPane}
            updateAddToBasecamp={toggleContactAddToBasecamp}
            contacts={contacts}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any contacts!"
          subtitle="Add your contacts to send customized emails to them."
          primaryAction={() => setShowNewContactPane(true)}
          primaryActionLabel="Add New Contact"
        />
      )}
      <NewContactPane
        addNewContact={addNewContact}
        showPane={showNewContactPane}
        onClose={closeNewContactPane}
        updateContact={updateContact}
        isEdit={editContactData.show}
        contactData={editContactData.contact}
      />
      {showDeleteAlert && (
        <DeleteAlert
          deleteContacts={deleteContacts}
          onClose={() => setShowDeleteAlert(false)}
          selectedContactIds={selectedContactIds}
        />
      )}
    </>
  );
};

export default Contacts;

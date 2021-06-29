import React, { useState, useEffect } from "react";
import { Button, PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";

import ContactsTable from "./ContactsTable";
import NewContactPane from "./NewContactPane";
import { INITIAL_CONTACTS_DATA } from "./constants";
import { SORT_VALUES_ARRAY, DASHBOARD_PAGINATION_PROPS } from "../constants";

const Contacts = () => {
  const [loading, setLoading] = useState(false);
  const [showNewContactPane, setShowNewContactPane] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [contacts, setContacts] = useState([]);

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
            deleteButtonProps
            sortProps={{
              options: SORT_VALUES_ARRAY,
            }}
            paginationProps={DASHBOARD_PAGINATION_PROPS}
            showMenu={false}
          />
          <ContactsTable
            selectedContactIds={selectedContactIds}
            setSelectedContactIds={setSelectedContactIds}
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
        setShowPane={setShowNewContactPane}
      />
    </>
  );
};

export default Contacts;

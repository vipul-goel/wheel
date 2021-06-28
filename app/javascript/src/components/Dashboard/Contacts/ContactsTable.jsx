import React from "react";
import { Checkbox, Avatar, Button, Tooltip } from "neetoui";

const ContactsTable = ({
  selectedContactIds,
  setSelectedContactIds,
  contacts,
}) => {
  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox nui-table--actions">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedContactIds.length ===
                  contacts.map(contact => contact.id).length
                }
                onClick={() => {
                  const noteIds = contacts.map(contact => contact.id);
                  if (selectedContactIds.length === noteIds.length) {
                    setSelectedContactIds([]);
                  } else {
                    setSelectedContactIds(noteIds);
                  }
                }}
              />
            </th>
            <th className="text-left text-gray-400">name</th>
            <th className="text-left text-gray-400">email</th>
            <th className="text-center text-gray-400">department</th>
            <th className="text-center text-gray-400">contact number</th>
            <th className="text-center text-gray-400">add to basecamp</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr
              key={contact.id}
              className={"cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedContactIds.includes(contact.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedContactIds.indexOf(contact.id);

                    if (index > -1) {
                      setSelectedContactIds([
                        ...selectedContactIds.slice(0, index),
                        ...selectedContactIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedContactIds([
                        ...selectedContactIds,
                        contact.id,
                      ]);
                    }
                  }}
                />
              </td>
              <td>
                <div className="flex flex-row items-center gap-x-2">
                  <Avatar
                    contact={{ name: contact.name }}
                    bgClassName="bg-purple-300"
                  />
                  {contact.name}
                </div>
              </td>
              <td>{contact.email}</td>
              <td className="text-center">{contact.department}</td>
              <td className="text-center">{contact.contactNumber}</td>
              <td>
                <Checkbox checked={contact.addToBasecamp} />
              </td>
              <td>
                <div className="flex flex-row space-x-2">
                  <Tooltip content="Edit" position="bottom">
                    <Button style="icon" icon="ri-edit-line" />
                  </Tooltip>
                  <Tooltip content="Delete" position="bottom">
                    <Button style="icon" icon="ri-delete-bin-5-line" />
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;

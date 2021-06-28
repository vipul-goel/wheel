import React from "react";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { Input, Textarea, Select, Switch } from "neetoui/formik";
import { Button } from "neetoui";

import {
  AddNoteFormInitialValues,
  AddNoteFormValidations,
  ContactsValuesArray,
  TagsValuesArray,
} from "./constants";

export default function NewNoteForm({ onClose, addNewNote }) {
  const handleSubmit = values => {
    values.createdDate = dayjs().format("MMMM DD, YYYY");
    values.dueDate = values.isDueDate
      ? dayjs(values.dueDate, "DD/MM/YYYY").format("MMMM DD, YYYY")
      : "";
    addNewNote(values);
    onClose();
  };
  return (
    <Formik
      initialValues={AddNoteFormInitialValues}
      onSubmit={handleSubmit}
      validationSchema={AddNoteFormValidations}
    >
      {({ isSubmitting, handleChange, setFieldValue, values }) => (
        <Form className="space-y-6">
          <Input label="Note Title" name="title" />
          <Select
            label="Tags"
            name="tag"
            placeholder="Select a tag"
            onChange={option => {
              handleChange(option.value);
              setFieldValue("tag", option.value);
            }}
            options={TagsValuesArray}
          />
          <Textarea label="Note Description" name="description" rows={4} />
          <Select
            label="Assigned Contact"
            name="contact"
            placeholder="Select a contact"
            onChange={option => {
              handleChange(option.value);
              setFieldValue("contact", option.value);
            }}
            options={ContactsValuesArray}
          />
          <div className="flex flex-row items-center justify-between">
            Add Due Date to Note
            <Switch name="isDueDate" />
          </div>
          {values.isDueDate && (
            <Input
              placeholder="Ex: 21/10/2021"
              label="Due Date"
              name="dueDate"
            />
          )}
          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />

            <Button
              type="submit"
              label="Submit"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

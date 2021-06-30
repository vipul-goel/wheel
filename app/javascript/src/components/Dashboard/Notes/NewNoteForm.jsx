import React from "react";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { Input, Textarea, Select, Switch } from "neetoui/formik";
import { Button, DateInput } from "neetoui";

import {
  NOTE_FORM_VALIDATIONS,
  CONTACT_VALUES_ARRAY,
  TAG_VALUES_ARRAY,
} from "./constants";

export default function NewNoteForm({
  onClose,
  saveChanges,
  initialFormValues,
}) {
  const handleSubmit = values => {
    if (values.isDueDate && !values.dueDate) return false;
    values.createdDate = dayjs().format("MMMM DD, YYYY");
    saveChanges(values);
    onClose();
  };
  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={NOTE_FORM_VALIDATIONS}
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
            options={TAG_VALUES_ARRAY}
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
            options={CONTACT_VALUES_ARRAY}
          />
          <div className="flex flex-row items-center justify-between">
            Add Due Date to Note
            <Switch name="isDueDate" />
          </div>
          {values.isDueDate && (
            <DateInput
              label="Due Date"
              format="DD/MM/YYYY"
              minDate={new Date()}
              canClearSelection={false}
              value={
                initialFormValues.isDueDate
                  ? new Date(initialFormValues.dueDate)
                  : undefined
              }
              onChange={newDate =>
                setFieldValue(
                  "dueDate",
                  newDate ? dayjs(newDate).format("MMM DD, YYYY") : null
                )
              }
              error={
                values.isDueDate && !values.dueDate
                  ? "Due date is required"
                  : ""
              }
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
              label="Save Changes"
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

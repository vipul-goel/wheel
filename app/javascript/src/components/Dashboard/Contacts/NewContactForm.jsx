import React from "react";
import { Formik, Form } from "formik";
import { Input, Select, Switch } from "neetoui/formik";
import { Button } from "neetoui";

import { CONTACT_FORM_VALIDATIONS, DEPARTMENT_VALUES_ARRAY } from "./constants";

const NewContactForm = ({ onClose, saveChanges, initialFormValues }) => {
  const handleSubmit = values => {
    saveChanges(values);
    onClose();
  };
  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={CONTACT_FORM_VALIDATIONS}
    >
      {({ isSubmitting, handleChange, setFieldValue }) => (
        <Form className="space-y-6">
          <Input label="Name" name="name" />
          <Input label="Email" name="email" />
          <Input label="Contact Number" name="contactNumber" />
          <Select
            label="Department"
            name="department"
            placeholder="Select a department"
            onChange={option => {
              handleChange(option.value);
              setFieldValue("department", option.value);
            }}
            options={DEPARTMENT_VALUES_ARRAY}
          />
          <div className="flex flex-row items-center justify-between">
            Add to Basecamp
            <Switch name="addToBasecamp" />
          </div>
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
};

export default NewContactForm;

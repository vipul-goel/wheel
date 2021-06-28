import React from "react";
import * as yup from "yup";
import moment from "moment";
import { Formik, Form } from "formik";
import { Input, Textarea, Select, Switch } from "neetoui/formik";
import { Button } from "neetoui";

yup.addMethod(yup.string, "validDateInput", function (errorMessage) {
  return this.test("test-date-input", errorMessage, function (value) {
    const { path, createError } = this;
    return (
      moment(value, "DD/MM/YYYY", true).isValid() ||
      createError({ path, message: errorMessage })
    );
  });
});

export default function NewNoteForm({ onClose, addNewNote }) {
  const handleSubmit = values => {
    values.createdDate = moment(new Date()).format("MMMM DD, YYYY");
    values.dueDate = values.isDueDate
      ? moment(new Date(values.dueDate), "DD/MM/YYYY").format("MMMM DD, YYYY")
      : "";
    addNewNote(values);
    onClose();
  };
  return (
    <Formik
      initialValues={{
        title: "",
        tag: "",
        description: "",
        contact: "",
        isDueDate: false,
        dueDate: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        title: yup.string().required("Title is required"),
        tag: yup.string().required("Tag is required"),
        description: yup.string().required("Description is required"),
        contact: yup.string().required("Contact is required"),
        isDueDate: yup.boolean(),
        dueDate: yup.string().when("isDueDate", {
          is: true,
          then: yup
            .string()
            .required("Due Date is required")
            .validDateInput("Enter a valid date in DD/MM/YYYY format only"),
          otherwise: yup.string(),
        }),
      })}
    >
      {({ isSubmitting, handleChange, setFieldValue, values }) => (
        <Form>
          <Input label="Note Title" name="title" className="mb-6" />
          <Select
            label="Tags"
            name="tag"
            placeholder="Select a tag"
            className="mb-6"
            onChange={option => {
              handleChange(option.value);
              setFieldValue("tag", option.value);
            }}
            options={[
              { value: "Internal", label: "Internal" },
              { value: "Agile Workflow", label: "Agile Workflow" },
              { value: "Bug", label: "Bug" },
            ]}
          />
          <Textarea
            label="Note Description"
            name="description"
            rows={4}
            className="mb-6"
          />
          <Select
            label="Assigned Contact"
            name="contact"
            placeholder="Select a contact"
            className="mb-6"
            onChange={option => {
              handleChange(option.value);
              setFieldValue("contact", option.value);
            }}
            options={[
              { value: "Neeraj Singh", label: "Neeraj Singh" },
              { value: "Vinay V", label: "Vinay V" },
              { value: "Charlie Smith", label: "Charlie Smith" },
              { value: "Karthik Menon", label: "Karthik Menon" },
            ]}
          />
          <div className="flex flex-row items-center justify-between mb-6">
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

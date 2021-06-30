import * as yup from "yup";

export const INITIAL_NOTES_DATA = [
  {
    id: 1,
    title: "Change Support Email",
    description: "forward all internal mails...",
    tag: "Internal",
    createdDate: "April 10, 2021",
    isDueDate: false,
    contact: "Neeraj Singh",
  },
  {
    id: 2,
    title: "Feedback",
    description: "Feedback v1.0",
    tag: "Agile Workflow",
    createdDate: "April 10, 2021",
    isDueDate: true,
    dueDate: "April 10, 2021",
    contact: "Vinay Chandran",
  },
  {
    id: 3,
    title: "Feedback Hover",
    description: "Feedback V2.0......",
    tag: "Bug",
    createdDate: "April 10, 2021",
    isDueDate: false,
    contact: "Charlie Smith",
  },
];

export const TAG_VALUES_ARRAY = [
  { value: "Internal", label: "Internal" },
  { value: "Agile Workflow", label: "Agile Workflow" },
  { value: "Bug", label: "Bug" },
];

export const CONTACT_VALUES_ARRAY = [
  { value: "Neeraj Singh", label: "Neeraj Singh" },
  { value: "Vinay Chandran", label: "Vinay Chandran" },
  { value: "Charlie Smith", label: "Charlie Smith" },
  { value: "Karthik Menon", label: "Karthik Menon" },
];

export const INITIAL_NOTE_FORM_VALUES = {
  title: "",
  tag: "",
  description: "",
  contact: "",
  isDueDate: false,
};

export const NOTE_FORM_VALIDATIONS = yup.object({
  title: yup.string().required("Title is required"),
  tag: yup.string().required("Tag is required"),
  description: yup.string().required("Description is required"),
  contact: yup.string().required("Contact is required"),
  isDueDate: yup.boolean(),
});

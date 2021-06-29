import * as yup from "yup";

export const INITIAL_CONTACTS_DATA = [
  {
    id: 1,
    name: "Neeraj Singh",
    email: "neeraj@bigbinary.com",
    department: "Engineering",
    contactNumber: "(555)-390-102",
    addToBasecamp: false,
  },
  {
    id: 2,
    name: "Vinay Chandran",
    email: "vinay@bigbinary.com",
    department: "Engineering",
    contactNumber: "99210011001",
    addToBasecamp: false,
  },
];

export const DEPARTMENT_VALUES_ARRAY = [
  { value: "Engineering", label: "Engineering" },
  { value: "Sales", label: "Sales" },
  { value: "HR", label: "HR" },
  { value: "Quality Assurance", label: "Quality Assurance" },
];

export const INITIAL_CONTACT_FORM_VALUES = {
  name: "",
  email: "",
  contactNumber: "",
  department: "",
  addToBasecamp: false,
};

export const CONTACT_FORM_VALIDATIONS = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  contactNumber: yup.string().required("Contact Number is required"),
  department: yup.string().required("Department is required"),
  addToBasecamp: yup.boolean(),
});

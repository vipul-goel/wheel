import * as yup from "yup";
import dayjs from "dayjs";

yup.addMethod(yup.string, "validDateInput", function (errorMessage) {
  return this.test("test-date-input", errorMessage, function (value) {
    const { path, createError } = this;
    return (
      dayjs(value, "DD/MM/YYYY").isValid() ||
      createError({ path, message: errorMessage })
    );
  });
});

export const InitialNotesData = [
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
    contact: "Vinay V",
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

export const SortValuesArray = [
  { label: "Tags", value: "tags" },
  { label: "Name", value: "name" },
  { label: "Created Date", value: "createdDate" },
];

export const TagsValuesArray = [
  { value: "Internal", label: "Internal" },
  { value: "Agile Workflow", label: "Agile Workflow" },
  { value: "Bug", label: "Bug" },
];

export const ContactsValuesArray = [
  { value: "Neeraj Singh", label: "Neeraj Singh" },
  { value: "Vinay V", label: "Vinay V" },
  { value: "Charlie Smith", label: "Charlie Smith" },
  { value: "Karthik Menon", label: "Karthik Menon" },
];

export const DashboardPaginationProps = {
  count: 250,
  pageNo: 1,
  pageSize: 50,
};

export const AddNoteFormInitialValues = {
  title: "",
  tag: "",
  description: "",
  contact: "",
  isDueDate: false,
  dueDate: "",
};

export const AddNoteFormValidations = yup.object({
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
});

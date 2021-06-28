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

export const TagsValuesArray = [
  { label: "Tags", value: "tags" },
  { label: "Name", value: "name" },
  { label: "Created Date", value: "createdDate" },
];

export const DashboardPaginationProps = {
  count: 250,
  pageNo: 1,
  pageSize: 50,
};

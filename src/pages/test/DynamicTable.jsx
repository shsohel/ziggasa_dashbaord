import React from "react";
import DynamicTable from "react-dynamic-data-table-component";
const columns = [
  {
    id: "nameId",
    name: "Name",
    selector: "name",
    // cell: (row) => row.documentType,
    width: "130px",
    center: true,
    isFixed: true,
    unResizable: true,
  },
  {
    id: "addressId",
    name: "Address",
    selector: "address",
    // cell: (row) => row.documentType,
    width: "130px",
    center: true,
  },
  {
    id: "ageId",
    name: "Age",
    selector: "age",
    // cell: (row) => row.documentType,
    width: "130px",
    center: true,
    unResizable: true,
    type: "number",
  },

  {
    id: "statusId",
    name: "Status",
    selector: "isActive",
    // cell: (row) => row.documentType,
    // sortable: true,
    width: "130px",
    center: true,
  },
  {
    id: "start-date-id",
    name: "Start Date",
    selector: "start_date",
    // cell: (row) => row.documentType,
    sortable: true,
    width: "130px",
    center: true,
  },
  {
    id: "end-date-id",
    name: "End Date",
    selector: "end_date",
    // cell: (row) => row.documentType,
    sortable: true,
    width: "130px",
    center: true,
  },
  {
    id: "end-date-id-2",
    name: "End Date",
    selector: "end_date",
    // cell: (row) => row.documentType,
    sortable: true,
    width: "130px",
    center: true,
  },
  {
    id: "end-date-id-3",
    name: "End Date",
    selector: "end_date",
    // cell: (row) => row.documentType,
    sortable: true,
    width: "130px",
    center: true,
  },
  {
    id: "end-date-id-4",
    name: "End Date",
    selector: "end_date",
    // cell: (row) => row.documentType,
    sortable: true,
    width: "130px",
    center: true,
  },
  {
    id: "end-date-id-5",
    name: "End Date",
    selector: "end_date",
    // cell: (row) => row.documentType,
    sortable: true,
    width: "130px",
    center: true,
  },
  {
    id: "end-date-id-6",
    name: "End Date",
    selector: "end_date",
    // cell: (row) => row.documentType,
    sortable: true,
    width: "200px",
    center: true,
  },
];

const data = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    email: "johndoe@example.com",
    address: "142 Center Street, Los Angeles, CA 90012",
    city: "Anytown",
    country: "USA",
    phone: "123-456-7890",
    job: "Engineer",
    company: "Tech Co",
    department: "R&D",
    hobbies: ["Reading", "Cooking", "Gaming"],
    isActive: true,
    start_date: "2022-01-01",
    end_date: "2023-12-31",
    rating: 4.5,
  },
];

const TestTable = () => {
  return (
    <div>
      <DynamicTable
        data={data}
        columns={columns}
        tableId="tableId"
        columnCache={true} //or it will persist fixed table columns to localstorage
      />
    </div>
  );
};

export default TestTable;

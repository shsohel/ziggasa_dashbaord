import { Delete, Edit, TrashIcon, View } from "lucide-react";

export const userColumn = (handleView, handleEdit, handleDelete) => {
  const columns = [
    {
      name: "Actions",
      //   width: '70px',
      cell: (row) => (
        <div className="flex items-center">
          <div className="text-danger hover:cursor-pointer me-1">
            <TrashIcon onClick={() => {handleView(row.id)}} size={18} />
          </div>
          <div className="text-success hover:cursor-pointer me-1">
            <Edit onClick={() => {handleEdit(row.id)}} size={18} />
          </div>
          <div className="text-primary hover:cursor-pointer">
            <View onClick={() => {handleDelete(row.id)}} size={18} />
          </div>
        </div>
      ),
    },
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Email",
      sortable: true,
      selector: (row) => row.email,
    },
    {
      name: "Role",
      sortable: true,
      selector: (row) => row.role,
    },
  ];

  return columns;
};

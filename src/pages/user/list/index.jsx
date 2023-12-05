import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../store/user";
import { userColumn } from "./column";

const UserList = () => {
  const { users, loading } = useSelector(({ users }) => users);
  const dispatch = useDispatch();

  const getUsers = () => {
    const paramObj = {
      page: 10,
      limit: 10,
      sort: "name",
    };
    dispatch(getAllUsers());
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = () => {
    console.log("edit");
  };
  const handleDelete = () => {
    console.log("delete");
  };
  const handleView = () => {
    console.log("view");
  };

  return (
    <>
      <div>
        <DataTable
          noHeader
          persistTableHead
          defaultSortAsc
          sortServer
          // onSort={handleSort}
          progressPending={loading}
          progressComponent={<div>Loading</div>}
          dense
          subHeader={false}
          highlightOnHover
          responsive={true}
          paginationServer
          // expandableRows={true}
          // expandOnRowClicked
          columns={userColumn(handleView, handleEdit, handleDelete)}
          // sortIcon={<ChevronDown />}
          // onRowExpandToggled={( bool, row ) => getRowIdClick( row.id )}
          className="react-custom-dataTable"
          // expandableRowsComponent={<AllLcList lcScData={lcScData} />}
          data={users}
        />
      </div>
    </>
  );
};

export default UserList;

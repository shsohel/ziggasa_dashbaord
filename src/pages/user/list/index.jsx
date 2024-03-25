import { useCallback, useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../store/user";
import { Button } from "../../../utils/custom/Button";
import FormLayout from "../../../utils/custom/FormLayout";
import Sidebar from "../../../utils/custom/Sidebar";
import UserAddForm from "../form/UserAddForm";
import { userColumn } from "./column";
import ListLoader from "../../../utils/custom/ListLoader";

const UserList = () => {
  const { users, loading } = useSelector(({ users }) => users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const getUsers = useCallback(() => {
    const paramObj = {
      page: 10,
      limit: 10,
      sort: "name",
    };
    dispatch(getAllUsers(paramObj));
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleOnClick = () => {
    navigate("/add-user");
  };

  const handleSidebarOpen = () => {
    setIsOpen(true);
  };

  const actions = [
    {
      id: "1",
      name: "new-button",

      button: (
        <Button
          id="new-button"
          label="New"
          onClick={() => {
            handleSidebarOpen();
          }}
        />
      ),
    },
    {
      id: "2",
      name: "refresh-button",
      button: (
        <Button
          id="refresh-button"
          label="Refresh"
          onClick={() => {
            getUsers();
          }}
        />
      ),
    },
  ];

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
      <FormLayout title="Users" actions={actions}>
        <div>
          <DataTable
            noHeader
            persistTableHead
            defaultSortAsc
            sortServer
            // onSort={handleSort}
            progressPending={loading}
            progressComponent={<ListLoader rowLength={5} colLength={9} />}
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
      </FormLayout>

      <UserAddForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default UserList;

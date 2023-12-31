import { Button } from "../../../utils/custom/Button";
import FormLayout from "../../../utils/custom/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getBlogs } from "../../../store/blog";
import DataTable from "react-data-table-component";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Pagination from "../../../utils/custom/Pagination";
import moment from "moment";
import { tableCustomStyles } from "../../../utils/utility";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading, total } = useSelector(({ blogs }) => blogs);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("desc");
  const [sortedBy, setSortedBy] = useState("createdAt");
  const [filterObj, setFilterObj] = useState({
    title: "",
  });

  const getAllBlogs = useCallback(() => {
    const query = {
      page: currentPage,
      limit: rowPerPage,
      sort: sortedBy,
      orderBy: orderBy,
    };
    const data = {
      query,
      filterObj,
    };
    dispatch(getBlogs(data));
  }, [dispatch, rowPerPage, currentPage, orderBy, sortedBy, filterObj]);

  useEffect(() => {
    getAllBlogs();
    return () => {};
  }, [dispatch, getAllBlogs]);

  const handleNew = () => {
    navigate("/blogs/new");
  };

  const actions = [
    {
      id: "1",
      name: "new-button",
      button: (
        <Button
          id="new-button"
          name="New"
          onClick={() => {
            handleNew();
          }}
        />
      ),
    },
  ];

  const handlePerPage = (perPage) => {
    setRowPerPage(perPage);
  };
  const handleSort = () => {};
  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const paginationComponent = (data) => {
    const { rowCount, paginationRowsPerPageOptions } = data;
    return (
      <div>
        <Pagination
          total={rowCount}
          handlePagination={handlePagination}
          handleRowPerPage={handlePerPage}
          rowPerPage={rowPerPage}
          page={currentPage}
          rows={paginationRowsPerPageOptions}
        />
      </div>
    );
  };
  return (
    <FormLayout title="Blogs" actions={actions}>
      <div>
        <div>
          <DataTable
            paginationTotalRows={total}
            persistTableHead
            dense
            progressPending={loading}
            progressComponent={
              <div className="w-full">
                <div>Loading</div>
              </div>
            }
            data={blogs}
            className="border "
            onChangeRowsPerPage={handlePerPage}
            onSort={handleSort}
            onChangePage={handlePagination}
            paginationServer
            sortServer
            defaultSortAsc
            defaultSortFieldId={sortedBy}
            columns={[
              {
                id: "action",
                name: "Action",
                width: "80px",
                cell: (row) => (
                  <div className="flex justify-between">
                    <FaTrashAlt
                      onClick={() => {
                        // dispatch(deleteUser(row));
                      }}
                      size={16}
                      className="mr-3 cursor-pointer fill-red-600"
                    />
                    <FaPencilAlt
                      onClick={() => {
                        // handleEdit(row);
                      }}
                      size={16}
                      className="cursor-pointer fill-green-600"
                    />
                  </div>
                ),
              },

              {
                id: "title",
                name: "Title",
                selector: (row) => row["title"],
              },
              {
                id: "createdAt",
                name: "Date",
                width: "120px",
                selector: (row) =>
                  moment(row["createdAt"]).format("DD-MMM-YYYY"),
              },
              {
                id: "writer",
                name: "Author",
                width: "100px",
                selector: (row) => row["writer"].name,
              },

              {
                id: "active",
                name: "Status",
                width: "100px",
                center: true,
                cell: (row) => (row.isActive ? "Active" : "InActive"),
              },
            ]}
            paginationComponent={paginationComponent}
            customStyles={tableCustomStyles}
            pagination
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default Blogs;

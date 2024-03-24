import { Button } from "../../../utils/custom/Button";
import FormLayout from "../../../utils/custom/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getJob, getJobs } from "../../../store/job";
import DataTable from "react-data-table-component";
import { FaCopy, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Pagination from "../../../utils/custom/Pagination";
import moment from "moment";
import { tableCustomStyles } from "../../../utils/utility";
import { useNavigate } from "react-router-dom";
import ListLoader from "../../../utils/custom/ListLoader";
import { IoNotifications } from "react-icons/io5";
import { sendUserNotification, urlIndexOnGoogle } from "../../../store/common";
import { BiSolidInjection } from "react-icons/bi";
const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, job, loading, total } = useSelector(({ job }) => job);
  const { loading: commonLoading } = useSelector(({ common }) => common);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("desc");
  const [sortedBy, setSortedBy] = useState("createdAt");
  const [filterObj, setFilterObj] = useState({
    title: "",
  });

  const getAllJobs = useCallback(() => {
    const queryParams = {
      page: currentPage,
      limit: rowPerPage,
      sort: sortedBy,
      orderBy: orderBy,
    };
    const data = {
      queryParams,
      queryObj: filterObj,
    };
    dispatch(getJobs(data));
  }, [dispatch, rowPerPage, currentPage, orderBy, sortedBy, filterObj]);

  useEffect(() => {
    getAllJobs();
    return () => {};
  }, [dispatch, getAllJobs]);

  const handleNew = () => {
    navigate("/jobs/new");
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
            handleNew();
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
          bgColor="bg-mute"
          onClick={() => {
            getAllJobs();
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

  const handleEdit = (id) => {
    navigate("/jobs/edit", { state: id });
  };
  const handleClone = (id) => {
    navigate("/jobs/new");
    dispatch(getJob({ id }));
  };
  const notifyUser = (row) => {
    const payload = {
      title: row.title,
      imageUrl: row.featuredImageUrl,
      details: row.metaDescription,
      url: `https://ziggasa.com/jobs/${row.slug}`,
    };
    dispatch(sendUserNotification(payload));
  };

  const handleIndexing = (row) => {
    const payload = {
      url: `https://ziggasa.com/jobs/${row.slug}`,
    };
    dispatch(urlIndexOnGoogle(payload));
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
    <FormLayout title="Jobs" actions={actions}>
      <div>
        <div>
          <DataTable
            paginationTotalRows={total}
            persistTableHead
            dense
            progressPending={loading || commonLoading}
            progressComponent={<ListLoader rowLength={10} />}
            data={jobs}
            className="border custom-scrollbar"
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
                width: "180px",
                cell: (row) => (
                  <div className="flex gap-3 justify-between">
                    <FaTrashAlt
                      onClick={() => {
                        // dispatch(deleteUser(row));
                      }}
                      size={16}
                      className=" cursor-pointer fill-red-600 hover:fill-secondary"
                    />
                    <FaPencilAlt
                      onClick={() => {
                        handleEdit(row.id);
                      }}
                      size={16}
                      className="cursor-pointer fill-green-600 hover:fill-secondary"
                    />
                    <FaCopy
                      onClick={() => {
                        handleClone(row.id);
                      }}
                      size={16}
                      className="cursor-pointer fill-green-600 hover:fill-secondary"
                    />
                    <IoNotifications
                      onClick={() => {
                        notifyUser(row);
                      }}
                      size={16}
                      className="cursor-pointer fill-green-600 hover:fill-secondary"
                    />
                    <BiSolidInjection
                      onClick={() => {
                        handleIndexing(row);
                      }}
                      size={16}
                      className="cursor-pointer fill-green-600 hover:fill-secondary"
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
                id: "jobType",
                name: "Job Type",
                width: "120px",
                selector: (row) => row["jobType"],
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

export default Jobs;

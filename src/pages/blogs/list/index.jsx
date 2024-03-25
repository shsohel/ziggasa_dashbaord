import { Button } from "../../../utils/custom/Button";
import FormLayout from "../../../utils/custom/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteBlog, getBlog, getBlogs } from "../../../store/blog";
import DataTable from "react-data-table-component";
import { FaCopy, FaFilter, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Pagination from "../../../utils/custom/Pagination";
import moment from "moment";
import { tableCustomStyles } from "../../../utils/utility";
import { useNavigate } from "react-router-dom";
import ListLoader from "../../../utils/custom/ListLoader";
import { confirmDialog } from "../../../utils/custom/ConfirmDialogBox";
import { confirmObj } from "../../../utils/enum";
import { sendUserNotification, urlIndexOnGoogle } from "../../../store/common";
import { IoNotifications } from "react-icons/io5";
import { BiSolidInjection } from "react-icons/bi";
import InputBox from "../../../utils/custom/InputBox";
import ExpandedBlogRow from "./ExpandedBlogRow";
const Blogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading, total } = useSelector(({ blog }) => blog);
  const { loading: commonLoading } = useSelector(({ common }) => common);

  const [isOpenFilterBox, setIsOpenFilterBox] = useState(true);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("desc");
  const [sortedBy, setSortedBy] = useState("createdAt");
  const [filterObj, setFilterObj] = useState({
    title: "",
  });

  const getAllBlogs = useCallback(() => {
    const queryParams = {
      page: currentPage,
      limit: rowPerPage,
      sort: sortedBy,
      orderBy: orderBy,
    };
    const data = {
      queryParams,
    };
    dispatch(getBlogs(data));
  }, [dispatch, rowPerPage, currentPage, orderBy, sortedBy]);

  useEffect(() => {
    getAllBlogs();
    return () => {};
  }, [dispatch, getAllBlogs]);

  const handleNew = () => {
    navigate("/blogs/new");
  };

  const handleFilter = () => {
    setIsOpenFilterBox((prev) => !prev);
  };

  const handleFilterOnChange = (e) => {
    const { name, value } = e.target;
    setFilterObj({
      ...filterObj,
      [name]: value,
    });
  };

  const handleSearch = () => {
    const queryParams = {
      page: currentPage,
      limit: rowPerPage,
      sort: sortedBy,
      orderBy: orderBy,
      title: filterObj.title,
    };
    !queryParams.title && delete queryParams.title;

    const data = {
      queryParams,
      // queryObj: filterObj,
    };
    dispatch(getBlogs(data));
  };
  const handleReset = () => {
    getAllBlogs();
    setFilterObj({
      title: "",
    });
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
          onClick={() => {
            getAllBlogs();
          }}
        />
      ),
    },
    {
      id: "3",
      name: "filter",
      button: (
        <Button
          id="new-button"
          label="New"
          icon={<FaFilter size={20} className="text-white p-1" />}
          onClick={() => {
            handleFilter();
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
    navigate("/blogs/edit", { state: id });
  };

  const handleDelete = (id) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        dispatch(deleteBlog(id));
      }
    });
  };

  const handleClone = (id) => {
    navigate("/blogs/new");
    dispatch(getBlog({ id }));
  };

  const notifyUser = (row) => {
    const payload = {
      title: row.title,
      imageUrl: row.featuredImageUrl,
      details: row.metaDescription,
      url: `https://ziggasa.com/${row.slug}`,
    };
    dispatch(sendUserNotification(payload));
  };
  const handleIndexing = (row) => {
    const payload = {
      url: `https://ziggasa.com/${row.slug}`,
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
    <FormLayout title="Blogs" actions={actions}>
      <div>
        <div
          className={` grid-cols-12 gap-3 items-center ${
            isOpenFilterBox ? "grid transition-all duration-1000" : "hidden"
          } `}
        >
          <div className={`my-2 col-span-12 md:col-span-10 grid grid-cols-6`}>
            <div className="col-span-6 md:col-span-2">
              <InputBox
                label="Title"
                value={filterObj.title}
                name="title"
                onChange={handleFilterOnChange}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-2 justify-self-end  ">
            <Button
              id="Search-button"
              label="Search"
              onClick={() => {
                handleSearch();
              }}
            />
            <Button
              id="reset-button"
              className="bg-slate-400"
              label="Reset"
              onClick={() => {
                handleReset();
              }}
            />
          </div>
        </div>
        <div>
          <DataTable
            paginationTotalRows={total}
            persistTableHead
            dense
            progressPending={loading || commonLoading}
            progressComponent={<ListLoader rowLength={10} />}
            data={blogs}
            className="border custom-scrollbar"
            onChangeRowsPerPage={handlePerPage}
            onSort={handleSort}
            onChangePage={handlePagination}
            paginationServer
            sortServer
            defaultSortAsc
            defaultSortFieldId={sortedBy}
            expandableRows
            columns={[
              {
                id: "action",
                name: "Action",
                width: "160px",
                cell: (row) => (
                  <div className="flex justify-between gap-4">
                    <FaTrashAlt
                      onClick={() => {
                        handleDelete(row?.id);
                      }}
                      size={16}
                      className=" cursor-pointer fill-red-600"
                    />
                    <FaPencilAlt
                      onClick={() => {
                        handleEdit(row.id);
                      }}
                      size={16}
                      className="cursor-pointer fill-green-600"
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
                selector: (row) => row["writer"]?.name,
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
            expandableRowsComponent={ExpandedBlogRow}
            expandableRowsComponentProps={{
              getAllBlogs: getAllBlogs,
            }}
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default Blogs;

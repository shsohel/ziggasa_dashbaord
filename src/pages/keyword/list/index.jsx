import { Button } from "../../../utils/custom/Button";
import FormLayout from "../../../utils/custom/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Pagination from "../../../utils/custom/Pagination";
import moment from "moment";
import { tableCustomStyles } from "../../../utils/utility";
import { useNavigate } from "react-router-dom";
import {
  bindKeywordSidebar,
  deleteKeyword,
  getKeywords,
  getKeyword,
} from "../../../store/keyword";
import KeywordForm from "../form/KeywordForm";
import { HttpStatusCode } from "axios";
import { confirmDialog } from "../../../utils/custom/ConfirmDialogBox";
import { confirmObj } from "../../../utils/enum";
import ListLoader from "../../../utils/custom/ListLoader";

const Keywords = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keywords, keywordSidebarOpen, loading, total } = useSelector(
    ({ keyword }) => keyword,
  );
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("desc");
  const [sortedBy, setSortedBy] = useState("createdAt");
  const [filterObj, setFilterObj] = useState({
    name: "",
  });

  const getAllKeywords = useCallback(() => {
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
    dispatch(getKeywords(data));
  }, [dispatch, rowPerPage, currentPage, orderBy, sortedBy, filterObj]);

  useEffect(() => {
    getAllKeywords();
    return () => {};
  }, [dispatch, getAllKeywords]);

  const handleNew = () => {
    dispatch(bindKeywordSidebar(true));
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
    {
      id: "2",
      name: "refresh-button",
      button: (
        <Button
          id="refresh-button"
          name="Refresh"
          bgColor="bg-mute"
          onClick={() => {
            getAllKeywords();
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

  const handleDelete = (id) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        dispatch(deleteKeyword(id)).then((response) => {
          const { payload } = response;
          if (payload.status === HttpStatusCode.Ok) {
            getAllKeywords();
          }
        });
      }
    });
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
    <FormLayout title="Keywords" actions={actions}>
      <div>
        <div>
          <DataTable
            paginationTotalRows={total}
            persistTableHead
            dense
            progressPending={loading}
            progressComponent={<ListLoader rowLength={5} colLength={9} />}
            data={keywords}
            className="border "
            onChangeRowsPerPage={handlePerPage}
            onSort={handleSort}
            // onChangePage={handlePagination}
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
                        handleDelete(row.id);
                      }}
                      size={16}
                      className="mr-3 cursor-pointer fill-red-600"
                    />
                    <FaPencilAlt
                      onClick={() => {
                        dispatch(getKeyword(row.id));
                      }}
                      size={16}
                      className="cursor-pointer fill-green-600"
                    />
                  </div>
                ),
              },

              {
                id: "name",
                name: "Name",
                selector: (row) => row["name"],
              },
              {
                id: "createdAt",
                name: "Date",
                width: "120px",
                selector: (row) =>
                  moment(row["createdAt"]).format("DD-MMM-YYYY"),
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
      {keywordSidebarOpen && <KeywordForm />}
    </FormLayout>
  );
};

export default Keywords;

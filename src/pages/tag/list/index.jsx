import { Button } from '../../../utils/custom/Button';
import FormLayout from '../../../utils/custom/FormLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Pagination from '../../../utils/custom/Pagination';
import moment from 'moment';
import { tableCustomStyles } from '../../../utils/utility';
import { useNavigate } from 'react-router-dom';
import { bindTagSidebar, deleteTag, getTags, getTag } from '../../../store/tag';
import TagModal from '../form/TagForm';
import { HttpStatusCode } from 'axios';
import { confirmDialog } from '../../../utils/custom/ConfirmDialogBox';
import { confirmObj } from '../../../utils/enum';
import ListLoader from '../../../utils/custom/ListLoader';

const Tags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tags, tagSidebarOpen, loading, total } = useSelector(
    ({ tag }) => tag
  );
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState('desc');
  const [sortedBy, setSortedBy] = useState('createdAt');
  const [filterObj, setFilterObj] = useState({
    name: '',
  });

  const getAllTags = useCallback(() => {
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
    dispatch(getTags(data));
  }, [dispatch, rowPerPage, currentPage, orderBy, sortedBy, filterObj]);

  useEffect(() => {
    getAllTags();
    return () => {};
  }, [dispatch, getAllTags]);

  const handleNew = () => {
    dispatch(bindTagSidebar(true));
  };

  const actions = [
    {
      id: '1',
      name: 'new-button',
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
      id: '2',
      name: 'refresh-button',
      button: (
        <Button
          id="refresh-button"
          name="Refresh"
          bgColor="bg-txt-mute"
          onClick={() => {
            getAllTags();
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
        dispatch(deleteTag(id)).then((response) => {
          const { payload } = response;
          if (payload.status === HttpStatusCode.Ok) {
            getAllTags();
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
    <FormLayout title="Tags" actions={actions}>
      <div>
        <div>
          <DataTable
            paginationTotalRows={total}
            persistTableHead
            dense
            progressPending={loading}
            progressComponent={<ListLoader rowLength={5} colLength={9} />}
            data={tags}
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
                id: 'action',
                name: 'Action',
                width: '80px',
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
                        dispatch(getTag(row.id));
                      }}
                      size={16}
                      className="cursor-pointer fill-green-600"
                    />
                  </div>
                ),
              },

              {
                id: 'name',
                name: 'Name',
                selector: (row) => row['name'],
              },
              {
                id: 'createdAt',
                name: 'Date',
                width: '120px',
                selector: (row) =>
                  moment(row['createdAt']).format('DD-MMM-YYYY'),
              },

              {
                id: 'active',
                name: 'Status',
                width: '100px',
                center: true,
                cell: (row) => (row.isActive ? 'Active' : 'InActive'),
              },
            ]}
            paginationComponent={paginationComponent}
            customStyles={tableCustomStyles}
            pagination
          />
        </div>
      </div>
      {tagSidebarOpen && <TagModal />}
    </FormLayout>
  );
};

export default Tags;

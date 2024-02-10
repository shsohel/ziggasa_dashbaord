import { Button } from '../../../utils/custom/Button';
import FormLayout from '../../../utils/custom/FormLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getJobs } from '../../../store/job';
import DataTable from 'react-data-table-component';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Pagination from '../../../utils/custom/Pagination';
import moment from 'moment';
import { tableCustomStyles } from '../../../utils/utility';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, job, loading, total } = useSelector(({ job }) => job);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState('desc');
  const [sortedBy, setSortedBy] = useState('createdAt');
  const [filterObj, setFilterObj] = useState({
    title: '',
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
    navigate('/jobs/new');
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
    <FormLayout title="Jobs" actions={actions}>
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
            data={jobs}
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
                id: 'action',
                name: 'Action',
                width: '80px',
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
                id: 'title',
                name: 'Title',
                selector: (row) => row['title'],
              },
              {
                id: 'createdAt',
                name: 'Date',
                width: '120px',
                selector: (row) =>
                  moment(row['createdAt']).format('DD-MMM-YYYY'),
              },
              {
                id: 'writer',
                name: 'Author',
                width: '100px',
                selector: (row) => row['writer'].name,
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
    </FormLayout>
  );
};

export default Jobs;
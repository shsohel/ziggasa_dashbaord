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
import {
  bindCategorySidebar,
  getCategories,
  getCategory,
} from '../../../store/category';
import CategoryModal from '../form/CategoryForm';

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, categorySidebarOpen, loading, total } = useSelector(
    ({ category }) => category
  );
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState('desc');
  const [sortedBy, setSortedBy] = useState('createdAt');
  const [filterObj, setFilterObj] = useState({
    name: '',
  });

  const getAllCategories = useCallback(() => {
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
    dispatch(getCategories(data));
  }, [dispatch, rowPerPage, currentPage, orderBy, sortedBy, filterObj]);

  useEffect(() => {
    getAllCategories();
    return () => {};
  }, [dispatch, getAllCategories]);

  const handleNew = () => {
    dispatch(bindCategorySidebar(true));
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
            getAllCategories();
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
    <FormLayout title="Categories" actions={actions}>
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
            data={categories}
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
                        dispatch(getCategory(row.id));
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
      {categorySidebarOpen && <CategoryModal />}
    </FormLayout>
  );
};

export default Categories;

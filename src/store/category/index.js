import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { apiEndpoints } from '../../services/apis';
import { baseAxios } from '../../services';
import { convertQueryString } from '../../utils/utility';
import { notify } from '../../utils/custom/Notification';
import { categoryModel } from './model';

import { HttpStatusCode } from 'axios';
const types = {
  GET_CATEGORY_DROPDOWN: 'GET_CATEGORY_DROPDOWN',
  GET_ALL_CATEGORIES_BY_QUERY: 'GET_ALL_CATEGORIES_BY_QUERY',
  GET_CATEGORY_BY_ID: 'GET_CATEGORY_BY_ID',
  ADD_CATEGORY: 'ADD_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
};  
 
//Get List Data by Query
export const getCategories = createAsyncThunk(
  'GET_ALL_CATEGORIES_BY_QUERY', async (data) => { 
    const { queryParams, queryObj } = data; 
    // console.log("filter", filter);
    const apiEndpoint = `/category?${convertQueryString(queryParams)}`;

    const response = await baseAxios.post(apiEndpoint, queryObj);
    return {
      ...response.data,
      queryParams, 
      queryObj,
    };
  }
);
 
export const bindCategoryDropdown = createAsyncThunk(
  types.GET_CATEGORY_DROPDOWN,
  async () => {
    const apiEndPoint = apiEndpoints.category;
    const res = await baseAxios.get(apiEndPoint);
    const dropdown = res.data.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    return dropdown;
  }
);

export const addCategory = createAsyncThunk(
  types.ADD_CATEGORY,
  async (data) => {
    const apiEndPoint = `${apiEndpoints.category}/new`;

    try {
      const response = await baseAxios.post(apiEndPoint, data);

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch ({ response }) {
      console.log(response);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    }
  }
);
export const updateCategory = createAsyncThunk(
  types.UPDATE_CATEGORY,
  async (data) => {
    const apiEndPoint = `${apiEndpoints.category}/${data.id}`;
    try {
      const response = await baseAxios.put(apiEndPoint, data);

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch ({ response }) {
      return {
        data: response?.data,
        status: response?.status,
        statusText: response?.statusText,
      };
    }
  }
);
export const deleteCategory = createAsyncThunk(
  types.DELETE_CATEGORY,
  async (id) => {
    const apiEndPoint = `${apiEndpoints.category}/${id}`;
    try {
      const response = await baseAxios.delete(apiEndPoint);

      return {
        data: response?.data,
        status: response?.status,
        statusText: response?.statusText,
      };
    } catch ({ response }) {
      return {
        data: response?.data,
        status: response?.status,
        statusText: response?.statusText,
      };
    }
  }
);

export const getCategory = createAsyncThunk(
  types.GET_CATEGORY_BY_ID,
  async (id) => {
    const apiEndPoint = `${apiEndpoints.category}/${id}`;
    const res = await baseAxios.get(apiEndPoint);
    const data = res.data.data;

    const dt = {
      ...data,
      parentCategory: data.parent
        ? {
            label: data.parent?.name,
            value: data.parent?.id,
          }
        : null,
    };
    return dt;
  }
);
const adaper = createEntityAdapter();

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    category: categoryModel,
    total: 1,
    queryParams: {},
    queryObj: {},
    loading: false,
    categoryDropdown: [],
    isCategoryDropdownLoaded: true,
    categorySidebarOpen: false,
  },
  reducers: {
    bindCategorySidebar: (state, action) => {
      state.categorySidebarOpen = action.payload;
    },
    bindCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  //   reducers: {
  //     bindUserInfo: ( state, action ) => {
  //       if ( action.payload ) {
  //         state.userData = action.payload;
  //       } else {
  //         state.userData = initialUserData;
  //       }
  //     },
  //     ///Roles
  //     bindRoleInfo: ( state, action ) => {
  //       if ( action.payload ) {
  //         state.roleBasicInfo = action.payload;
  //       } else {
  //         state.roleBasicInfo = initialRoleData;
  //       }
  //     },
  //     ///Role Permissions
  //     bindRolePermissions: ( state, action ) => {
  //       if ( action.payload ) {
  //         state.rolePermissions = action.payload;
  //       } else {
  //         state.rolePermissions = null;
  //       }
  //     },

  //   },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.categories = [];
        state.total = 0;
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        const { totalRecords, data, queryParams, queryObj } = action.payload;
        state.categories = data;
        state.total = totalRecords;
        state.loading = false;
        state.queryParams = queryParams;
        state.queryObj = queryObj;
      })
      .addCase(getCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.categorySidebarOpen = true;
        state.loading = false;
      })
      .addCase(bindCategoryDropdown.pending, (state, action) => {
        state.categoryDropdown = [];
        state.isCategoryDropdownLoaded = false;
      })
      .addCase(bindCategoryDropdown.fulfilled, (state, action) => {
        state.categoryDropdown = action.payload;
        state.isCategoryDropdownLoaded = true;
      })
      .addCase(addCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;
        state.loading = false;

        if (status === HttpStatusCode.Created) {
          state.categorySidebarOpen = false;
          state.category = categoryModel;
          notify('success', 'The Category has been created successfully');
        } else {
          notify('error', `${data.error}`);
        }
      })
      .addCase(addCategory.rejected, (state) => {
        state.loading = false;
        notify('error', 'The operation was rejected!');
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;

        state.loading = false;

        if (status === HttpStatusCode.Created) {
          state.categorySidebarOpen = false;
          state.category = categoryModel;
          notify('success', 'The Category has been updated successfully');
        } else {
          notify('error', `${data?.error}`);
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        notify('error', 'The operation was rejected!');
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const { status, data } = action.payload;
        console.log(action);
        state.loading = false;

        if (status === HttpStatusCode.Ok) {
          notify('success', 'The Category has been deleted successfully');
        } else {
          notify('error', `${data?.error}`);
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        notify('error', 'The operation was rejected!');
      });
  },
});
export const { bindCategorySidebar, bindCategory } = categorySlice.actions;
export default categorySlice.reducer;

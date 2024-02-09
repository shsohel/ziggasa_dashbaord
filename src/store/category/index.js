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
import { PURGE } from 'redux-persist';
import { store } from '../../store';
const types = {
  GET_CATEGORY_DROPDOWN: 'GET_CATEGORY_DROPDOWN',
  GET_ALL_CATEGORIES_BY_QUERY: 'GET_ALL_CATEGORIES_BY_QUERY',
  GET_CATEGORY_BY_ID: 'GET_CATEGORY_BY_ID',
  ADD_CATEGORY: 'ADD_CATEGORY',
};

//Get List Data by Query
export const getCategories = createAsyncThunk(
  'GET_ALL_CATEGORIES_BY_QUERY',
  async (data) => {
    const { query, filterObj } = data;
    // console.log("filter", filter);
    const apiEndpoint = `/category?${convertQueryString(query)}`;

    const response = await baseAxios.post(apiEndpoint, filterObj);
    return {
      ...response.data,
      query,
      filterObj,
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
      return response.data;
    } catch ({ response }) {
      return response.data;
    }
  }
);
// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   const response = await client.get('/fakeApi/posts')
//   return response.data
// })

export const getCategory = createAsyncThunk(
  types.GET_CATEGORY_BY_ID,
  async (id) => {
    const apiEndPoint = `${apiEndpoints.category}/${id}`;
    const res = await baseAxios.get(apiEndPoint);
    const data = res.data.data;

    const dt = {
      ...data,
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
        const { totalRecords, data, query, filterObj } = action.payload;
        state.categories = data;
        state.total = totalRecords;
        state.loading = false;
        state.queryParams = query;
        state.queryObj = filterObj;
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
        const { succeed } = action.payload;
        console.log(action);
        state.loading = false;
        state.categorySidebarOpen = false;
        notify('success', 'The Category has been created successfully');

        if (succeed) {
          // const { category } = store.getState();
          // const query = {
          //   query: category.queryParams,
          //   filterObj: category.queryObj,
          // };
          // console.log(query);
          // store.dispatch(getCategories(query));
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        notify('error', 'The Category has been created successfully');
      });
  },
});
export const { bindCategorySidebar, bindCategory } = categorySlice.actions;
export default categorySlice.reducer;

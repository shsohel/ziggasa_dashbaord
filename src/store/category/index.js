import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiEndpoints } from '../../services/apis';
import { baseAxios } from '../../services';

const types = {
  GET_CATEGORY_DROPDOWN: 'GET_CATEGORY_DROPDOWN',
  ADD_CATEGORY: 'ADD_CATEGORY',
};
export const bindCategoryDropdown = createAsyncThunk(
  types.GET_CATEGORY_DROPDOWN,
  async (data) => {
    const apiEndPoint = apiEndpoints.category;
    const res = await baseAxios.post(apiEndPoint, []);
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
    const apiEndPoint = `${apiEndpoints.category}/create`;
    const res = await baseAxios.post(apiEndPoint, data);
    const dropdown = res.data.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    return dropdown;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categoryDropdown: [],
    isCategoryDropdownLoaded: true,
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
    builder.addCase(bindCategoryDropdown.pending, (state, action) => {
      state.categoryDropdown = [];
      state.isCategoryDropdownLoaded = false;
    });
    builder.addCase(bindCategoryDropdown.fulfilled, (state, action) => {
      state.categoryDropdown = action.payload;
      state.isCategoryDropdownLoaded = true;
    });
  },
});

export default categorySlice.reducer;

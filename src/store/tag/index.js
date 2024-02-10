import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { apiEndpoints } from '../../services/apis';
import { baseAxios } from '../../services';
import { convertQueryString } from '../../utils/utility';
import { notify } from '../../utils/custom/Notification';
import { tagModel } from './model';
import { PURGE } from 'redux-persist';
import { store } from '../../store';
import { HttpStatusCode } from 'axios';
const types = {
  GET_TAG_DROPDOWN: 'GET_TAG_DROPDOWN',
  GET_ALL_CATEGORIES_BY_QUERY: 'GET_ALL_CATEGORIES_BY_QUERY',
  GET_TAG_BY_ID: 'GET_TAG_BY_ID',
  ADD_TAG: 'ADD_TAG',
  UPDATE_TAG: 'UPDATE_TAG',
  DELETE_TAG: 'DELETE_TAG',
};

//Get List Data by Query
export const getTags = createAsyncThunk(
  'GET_ALL_CATEGORIES_BY_QUERY',
  async (data) => {
    const { queryParams, queryObj } = data;
    // console.log("filter", filter);
    const apiEndpoint = `${apiEndpoints.tag}?${convertQueryString(
      queryParams
    )}`;

    const response = await baseAxios.post(apiEndpoint, queryObj);
    return {
      ...response.data,
      queryParams,
      queryObj,
    };
  }
);

export const bindTagDropdown = createAsyncThunk(
  types.GET_TAG_DROPDOWN,
  async () => {
    const apiEndPoint = apiEndpoints.tag;
    const res = await baseAxios.get(apiEndPoint);
    const dropdown = res.data.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    return dropdown;
  }
);

export const addTag = createAsyncThunk(types.ADD_TAG, async (data) => {
  const apiEndPoint = `${apiEndpoints.tag}/new`;

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
});
export const updateTag = createAsyncThunk(types.UPDATE_TAG, async (data) => {
  const apiEndPoint = `${apiEndpoints.tag}/${data.id}`;
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
});
export const deleteTag = createAsyncThunk(types.DELETE_TAG, async (id) => {
  const apiEndPoint = `${apiEndpoints.tag}/${id}`;
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
});

export const getTag = createAsyncThunk(types.GET_TAG_BY_ID, async (id) => {
  const apiEndPoint = `${apiEndpoints.tag}/${id}`;
  const res = await baseAxios.get(apiEndPoint);
  const data = res.data.data;

  const dt = {
    ...data,
  };
  return dt;
});
const adaper = createEntityAdapter();

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
    tag: tagModel,
    total: 1,
    queryParams: {},
    queryObj: {},
    loading: false,
    tagDropdown: [],
    isTagDropdownLoaded: true,
    tagSidebarOpen: false,
  },
  reducers: {
    bindTagSidebar: (state, action) => {
      state.tagSidebarOpen = action.payload;
    },
    bindTag: (state, action) => {
      state.tag = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state, action) => {
        state.tags = [];
        state.total = 0;
        state.loading = true;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        const { totalRecords, data, queryParams, queryObj } = action.payload;
        state.tags = data;
        state.total = totalRecords;
        state.loading = false;
        state.queryParams = queryParams;
        state.queryObj = queryObj;
      })
      .addCase(getTag.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTag.fulfilled, (state, action) => {
        state.tag = action.payload;
        state.tagSidebarOpen = true;
        state.loading = false;
      })
      .addCase(bindTagDropdown.pending, (state, action) => {
        state.tagDropdown = [];
        state.isTagDropdownLoaded = false;
      })
      .addCase(bindTagDropdown.fulfilled, (state, action) => {
        state.tagDropdown = action.payload;
        state.isTagDropdownLoaded = true;
      })
      .addCase(addTag.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addTag.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;
        state.loading = false;

        if (status === HttpStatusCode.Created) {
          state.tagSidebarOpen = false;
          state.tag = tagModel;
          notify('success', 'The Tag has been created successfully');
        } else {
          notify('error', `${data.error}`);
        }
      })
      .addCase(addTag.rejected, (state) => {
        state.loading = false;
        notify('error', 'The operation was rejected!');
      })
      .addCase(updateTag.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;

        state.loading = false;

        if (status === HttpStatusCode.Created) {
          state.tagSidebarOpen = false;
          state.tag = tagModel;
          notify('success', 'The Tag has been updated successfully');
        } else {
          notify('error', `${data?.error}`);
        }
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.loading = false;
        notify('error', 'The operation was rejected!');
      })
      .addCase(deleteTag.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        const { status, data } = action.payload;
        console.log(action);
        state.loading = false;

        if (status === HttpStatusCode.Ok) {
          notify('success', 'The Tag has been deleted successfully');
        } else {
          notify('error', `${data?.error}`);
        }
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.loading = false;
        notify('error', 'The operation was rejected!');
      });
  },
});
export const { bindTagSidebar, bindTag } = tagSlice.actions;
export default tagSlice.reducer;

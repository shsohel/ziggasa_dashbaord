import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { apiEndpoints } from '../../services/apis';
import { baseAxios } from '../../services';
import { convertQueryString } from '../../utils/utility';
import { notify } from '../../utils/custom/Notification';
import { keywordModel } from './model';

import { HttpStatusCode } from 'axios';
const types = {
  GET_KEYWORD_DROPDOWN: 'GET_KEYWORD_DROPDOWN',
  GET_ALL_KEYWORDS_BY_QUERY: 'GET_ALL_KEYWORDS_BY_QUERY',
  GET_KEYWORD_BY_ID: 'GET_KEYWORD_BY_ID',
  ADD_KEYWORD: 'ADD_KEYWORD',
  UPDATE_KEYWORD: 'UPDATE_KEYWORD',
  DELETE_KEYWORD: 'DELETE_KEYWORD',
};

//Get List Data by Query
export const getKeywords = createAsyncThunk(
  types.GET_ALL_KEYWORDS_BY_QUERY,
  async (data) => {
    const { queryParams, queryObj } = data;
    // console.log("filter", filter);
    const apiEndpoint = `${apiEndpoints.keyword}?${convertQueryString(
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

export const bindKeywordDropdown = createAsyncThunk(
  types.GET_KEYWORD_DROPDOWN,
  async () => {
    const apiEndPoint = apiEndpoints.keyword;
    const res = await baseAxios.get(apiEndPoint);
    const dropdown = res.data.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    return dropdown;
  }
);

export const addKeyword = createAsyncThunk(types.ADD_KEYWORD, async (data) => {
  const apiEndPoint = `${apiEndpoints.keyword}/new`;

  try {
    const response = await baseAxios.post(apiEndPoint, data);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch ({ response }) {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }
});
export const updateKeyword = createAsyncThunk(
  types.UPDATE_KEYWORD,
  async (data) => {
    const apiEndPoint = `${apiEndpoints.keyword}/${data.id}`;
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
export const deleteKeyword = createAsyncThunk(
  types.DELETE_KEYWORD,
  async (id) => {
    const apiEndPoint = `${apiEndpoints.keyword}/${id}`;
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

export const getKeyword = createAsyncThunk(
  types.GET_KEYWORD_BY_ID,
  async (id) => {
    const apiEndPoint = `${apiEndpoints.keyword}/${id}`;
    const res = await baseAxios.get(apiEndPoint);
    const data = res.data.data;

    const dt = {
      ...data,
    };
    return dt;
  }
);

const keywordSlice = createSlice({
  name: 'keyword',
  initialState: {
    keywords: [],
    keyword: keywordModel,
    total: 1,
    queryParams: {},
    queryObj: {},
    loading: false,
    keywordDropdown: [],
    isKeywordDropdownLoaded: true,
    keywordSidebarOpen: false,
  },
  reducers: {
    bindKeywordSidebar: (state, action) => {
      state.keywordSidebarOpen = action.payload;
    },
    bindKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getKeywords.pending, (state, action) => {
        state.keywords = [];
        state.total = 0;
        state.loading = true;
      })
      .addCase(getKeywords.fulfilled, (state, action) => {
        const { totalRecords, data, queryParams, queryObj } = action.payload;
        state.keywords = data;
        state.total = totalRecords;
        state.loading = false;
        state.queryParams = queryParams;
        state.queryObj = queryObj;
      })
      .addCase(getKeyword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getKeyword.fulfilled, (state, action) => {
        state.keyword = action.payload;
        state.keywordSidebarOpen = true;
        state.loading = false;
      })
      .addCase(bindKeywordDropdown.pending, (state, action) => {
        state.keywordDropdown = [];
        state.isKeywordDropdownLoaded = false;
      })
      .addCase(bindKeywordDropdown.fulfilled, (state, action) => {
        state.keywordDropdown = action.payload;
        state.isKeywordDropdownLoaded = true;
      })
      .addCase(addKeyword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addKeyword.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;
        state.loading = false;

        if (status === HttpStatusCode.Created) {
          state.keywordSidebarOpen = false;
          state.keyword = keywordModel;
          notify('success', 'The Keyword has been created successfully');
        } else {
          notify('error', `${data.error}`);
        }
      })
      .addCase(addKeyword.rejected, (state) => {
        state.loading = false;
        notify('error', 'The operation was rejected!');
      })
      .addCase(updateKeyword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateKeyword.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;

        state.loading = false;

        if (status === HttpStatusCode.Created) {
          state.keywordSidebarOpen = false;
          state.keyword = keywordModel;
          notify('success', 'The Keyword has been updated successfully');
        } else {
          notify('error', `${data?.error}`);
        }
      })
      .addCase(updateKeyword.rejected, (state, action) => {
        state.loading = false;
        notify('error', 'The operation was rejected!');
      })
      .addCase(deleteKeyword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteKeyword.fulfilled, (state, action) => {
        const { status, data } = action.payload;
        console.log(action);
        state.loading = false;

        if (status === HttpStatusCode.Ok) {
          notify('success', 'The Keyword has been deleted successfully');
        } else {
          notify('error', `${data?.error}`);
        }
      })
      .addCase(deleteKeyword.rejected, (state, action) => {
        state.loading = false;
        notify('error', 'The operation was rejected!');
      });
  },
});
export const { bindKeywordSidebar, bindKeyword } = keywordSlice.actions;
export default keywordSlice.reducer;

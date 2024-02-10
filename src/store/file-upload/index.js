import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiEndpoints } from '../../services/apis';
import { baseAxios } from '../../services';
import { convertQueryString } from '../../utils/utility';

const types = {
  GET_FILE_UPLOAD_DROPDOWN: 'GET_FILE_UPLOAD_DROPDOWN',
  GET_ALL_FILE_BY_QUERY: 'GET_ALL_FILE_BY_QUERY',
  GET_FILE_UPLOAD_BY_ID: 'GET_FILE_UPLOAD_BY_ID',
  ADD_FILE_UPLOAD: 'ADD_FILE_UPLOAD',
  UPDATE_FILE_UPLOAD: 'UPDATE_FILE_UPLOAD',
  DELETE_FILE_UPLOAD: 'DELETE_FILE_UPLOAD',
};

export const getFilesByQuery = createAsyncThunk(
  types.GET_ALL_FILE_BY_QUERY,
  async (data) => {
    const { queryParams } = data;
    const apiEndPoint = `${apiEndpoints.file}?${convertQueryString(
      queryParams
    )}`;

    const response = await baseAxios.get(apiEndPoint);
    return response.data;
  }
);

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState: {
    files: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilesByQuery.pending, (state, action) => {
        console.log(action);
        state.files = [];
        state.loading = true;
      })
      .addCase(getFilesByQuery.fulfilled, (state, action) => {
        const { data } = action.payload;
        console.log(action);

        state.files = data;
        state.loading = true;
      })
      .addCase(getFilesByQuery.rejected, (state, action) => {
        const { data } = action.payload;
        console.log(action);

        state.files = data;
        state.loading = true;
      });
  },
});

export default fileUploadSlice.reducer;

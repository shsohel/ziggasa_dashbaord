import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiEndpoints } from "../../services/apis";
import { baseAxios } from "../../services";
import { convertQueryString, uniqId } from "../../utils/utility";
import { HttpStatusCode } from "axios";
import { notify } from "../../utils/custom/Notification";

const types = {
  GET_FILE_UPLOAD_DROPDOWN: "GET_FILE_UPLOAD_DROPDOWN",
  GET_ALL_FILE_BY_QUERY: "GET_ALL_FILE_BY_QUERY",
  GET_FILE_UPLOAD_BY_ID: "GET_FILE_UPLOAD_BY_ID",
  FILE_UPLOAD: "FILE_UPLOAD",
  UPDATE_FILE_UPLOAD: "UPDATE_FILE_UPLOAD",
  DELETE_FILE_UPLOAD: "DELETE_FILE_UPLOAD",
};

export const getFilesByQuery = createAsyncThunk(
  types.GET_ALL_FILE_BY_QUERY,
  async (data) => {
    const { queryParams } = data;
    const apiEndPoint = `${apiEndpoints.file}?${convertQueryString(
      queryParams,
    )}`;

    const response = await baseAxios.get(apiEndPoint);
    return response.data;
  },
);
export const uploadFile = createAsyncThunk(types.FILE_UPLOAD, async (data) => {
  const { file } = data;
  const apiEndPoint = `${apiEndpoints.file}/photo`;

  try {
    const response = await baseAxios.post(apiEndPoint, file);
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

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    files: [],
    loading: false,
  },
  reducers: {
    bindFile: (state, action) => {
      if (action.payload) {
        state.files = action.payload;
      } else {
        state.files = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilesByQuery.pending, (state, action) => {
        console.log(action);
        state.files = [];
        state.loading = true;
      })
      .addCase(getFilesByQuery.fulfilled, (state, action) => {
        const { data } = action.payload;
        const modified = data.map((dt) => ({
          ...dt,
          rowId: uniqId(),
          title: dt.fileUrl.split(".")[0],
          captions: "",
          descriptions: "",
          altText: "",
          isSelected: false,
        }));

        state.files = modified;
        state.loading = true;
      })
      .addCase(getFilesByQuery.rejected, (state, action) => {
        const { data } = action.payload;

        state.files = data;
        state.loading = true;
      })
      .addCase(uploadFile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;
        state.loading = false;
        console.log(data);

        if (status === HttpStatusCode.Ok) {
          notify("success", "The file has been uploaded successfully");
        } else {
          notify("error", `${data.error}`);
        }
      })
      .addCase(uploadFile.rejected, (state) => {
        state.loading = false;
        notify("error", "The operation was rejected!");
      });
  },
});

export const { bindFile } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;

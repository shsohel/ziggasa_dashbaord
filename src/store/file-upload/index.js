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
  DELETE_FILE: "DELETE_FILE",
};

export const getFilesByQuery = createAsyncThunk(
  types.GET_ALL_FILE_BY_QUERY,
  async (data, { dispatch, getState }) => {
    const { queryParams } = data;
    const { job } = getState().job;
    const { blog } = getState().blog;
    const apiEndPoint = `${apiEndpoints.file}?${convertQueryString(
      queryParams,
    )}`;
    try {
      const response = await baseAxios.get(apiEndPoint);

      const whereFrom = queryParams?.from === "blog" ? blog : job;
      const {
        featuredImageUrl,
        featuredImageTitle,
        featuredImageCaptions,
        featuredImageDescriptions,
        featuredImageAltText,
      } = whereFrom;
      const fileData = response?.data?.data.map((dt) => ({
        ...dt,
        rowId: uniqId(),
        title: dt.fileUrl.split(".")[0],
        captions: "",
        descriptions: "",
        altText: "",
        isSelected: false,
      }));
      const updatedSelectedFile = fileData.map((dt) => {
        if (dt.fileUrl === featuredImageUrl) {
          dt["title"] = featuredImageTitle;
          dt["captions"] = featuredImageCaptions;
          dt["descriptions"] = featuredImageDescriptions;
          dt["altText"] = featuredImageAltText;
          dt["isSelected"] = true;
        }
        return dt;
      });
      return {
        queryParams,
        data: updatedSelectedFile,
        pagination: response?.data?.pagination,
        total: response?.data?.total,
        totalRecords: response?.data?.totalRecords,
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
  },
);
export const uploadFile = createAsyncThunk(
  types.FILE_UPLOAD,
  async (data, { dispatch, getState }) => {
    const { queryParams } = getState().file;
    const { file } = data;
    const apiEndPoint = `${apiEndpoints.file}/cloud-file`;

    try {
      const response = await baseAxios.post(apiEndPoint, file);
      dispatch(getFilesByQuery({ queryParams }));
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
  },
);

export const deleteFile = createAsyncThunk(
  types.DELETE_FILE,
  async (data, { dispatch, getState }) => {
    const { queryParams } = getState().file;

    const { fileId } = data;
    const apiEndPoint = `${apiEndpoints.file}/cloud-file/${fileId}`;
    try {
      const response = await baseAxios.delete(apiEndPoint);
      dispatch(getFilesByQuery({ queryParams }));

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
  },
);

const initialFile = {
  rowId: uniqId(),
  title: "",
  captions: "",
  descriptions: "",
  altText: "",
  fileUrl: "",
};

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    file: initialFile,
    files: [],
    pagination: {},
    queryParams: {},
    total: 0,
    totalRecords: 0,
    loading: false,
  },
  reducers: {
    bindFiles: (state, action) => {
      if (action.payload) {
        state.files = action.payload;
      } else {
        state.files = [];
      }
    },
    bindFile: (state, action) => {
      if (action.payload) {
        state.file = action.payload;
      } else {
        state.file = initialFile;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilesByQuery.pending, (state, action) => {
        state.files = [];
        state.loading = true;
      })
      .addCase(getFilesByQuery.fulfilled, (state, action) => {
        const { pagination, queryParams, total, totalRecords, data } =
          action.payload;

        state.files = data;
        state.pagination = pagination;
        state.queryParams = queryParams;
        state.total = total;
        state.totalRecords = totalRecords;
        state.loading = false;
      })
      .addCase(getFilesByQuery.rejected, (state, action) => {
        const { data } = action.payload;

        state.files = data;
        state.loading = false;
      })
      .addCase(uploadFile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;
        state.loading = false;

        if (status === HttpStatusCode.Ok) {
          notify("success", "The file has been uploaded successfully");
        } else {
          notify("error", `${data.error}`);
        }
      })
      .addCase(uploadFile.rejected, (state) => {
        state.loading = false;
        notify("error", "The operation was rejected!");
      })
      .addCase(deleteFile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;
        state.loading = false;
        if (status === HttpStatusCode.Ok) {
          notify("success", "The file has been removed successfully");
        } else {
          notify("error", `${data.error}`);
        }
      })
      .addCase(deleteFile.rejected, (state) => {
        state.loading = false;
        notify("error", "The operation was rejected!");
      });
  },
});

export const { bindFiles } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;

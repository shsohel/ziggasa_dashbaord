import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseAxios } from "../../services";
import { HttpStatusCode } from "axios";
import { notify } from "../../utils/custom/Notification";
import { apiEndpoints } from "../../services/apis";

const TYPES = {
  NOTIFY_USER: "NOTIFY_USER",
  URL_INDEXING_ON_GOOGLE: "URL_INDEXING_ON_GOOGLE",
};

export const sendUserNotification = createAsyncThunk(
  TYPES.NOTIFY_USER,
  async (data) => {
    const apiEndPoint = `${apiEndpoints.notify}/send-notification`;

    try {
      const response = await baseAxios.post(apiEndPoint, data);

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      const { response } = error;
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    }
  }
);
export const urlIndexOnGoogle = createAsyncThunk(
  TYPES.URL_INDEXING_ON_GOOGLE,
  async (data) => {
    const apiEndPoint = `${apiEndpoints.google}/instant-indexing`;

    try {
      const response = await baseAxios.post(apiEndPoint, data);

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      const { response } = error;
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    }
  }
);

const commonSlice = createSlice({
  name: "common",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendUserNotification.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendUserNotification.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;

        state.loading = false;
        if (status === HttpStatusCode.Ok) {
          notify("success", "The Notification has been created successfully");
        } else {
          notify("error", `${data?.error}`);
        }
      })
      .addCase(sendUserNotification.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The operation was rejected!");
      })
      .addCase(urlIndexOnGoogle.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(urlIndexOnGoogle.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;

        state.loading = false;
        if (status === HttpStatusCode.Ok) {
          notify("success", "The url has been indexed in Google successfully");
        } else {
          notify("error", `${data?.error}`);
        }
      })
      .addCase(urlIndexOnGoogle.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The operation was rejected!");
      });
  },
});

export default commonSlice.reducer;

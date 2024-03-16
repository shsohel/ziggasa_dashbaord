import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseAxios } from "../../services";
import { HttpStatusCode } from "axios";
import { notify } from "../../utils/custom/Notification";
import { apiEndpoints } from "../../services/apis";

export const sendUserNotification = createAsyncThunk(
  "notify user",
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
  },
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
      });
  },
});

export default commonSlice.reducer;

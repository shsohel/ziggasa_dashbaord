import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jobModel } from "./model";
import { baseAxios } from "../../services";
import { notify } from "../../utils/custom/Notification";
import { convertQueryString } from "../../utils/utility";
import { apiEndpoints } from "../../services/apis";

//Get List Data by Query
export const getJobs = createAsyncThunk(
  "job/getJobs",
  async (data, { dispatch, getState }) => {
    const { queryParams, queryObj } = data;
    const apiEndpoint = `${apiEndpoints.job}?${convertQueryString(
      queryParams
    )}`;
    try {
      const response = await baseAxios.post(apiEndpoint, queryObj);
      return response.data;
    } catch (error) {
      if (error.response) {
        notify("warning", error.response.data.error);
      } else {
        notify("error", "An error occurred");
      }
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: {
    dataProgress: false,
    submitUserDataProgress: false,
    openUserSidebar: false,
    jobs: [],
    job: jobModel,
    total: 1,
    queryParams: {},
    queryObj: {},
    loading: false,
  },
  reducers: {
    bindJob: (state, action) => {
      if (action.payload) {
        state.job = action.payload;
      } else {
        state.job = jobModel;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobs.fulfilled, (state, action) => {
      const { totalRecords, data, queryParams, queryObj } = action.payload;
      state.queryParams = queryParams;
      state.queryObj = queryObj;
      state.jobs = data;
      state.total = totalRecords;
      state.loading = false;
    });
  },
});

export const { bindJob } = jobSlice.actions;

export default jobSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jobModel } from './model';
import { baseAxios } from '../../services';
import { notify } from '../../utils/custom/Notification';
import { convertQueryString } from '../../utils/utility';
import { apiEndpoints } from '../../services/apis';


const types = {
  GET_JOBS_BY_QUERY: "GET_JOBS_BY_QUERY",
  ADD_NEW_JOB: "ADD_NEW_JOB",
};
//Get List Data by Query
export const getJobs = createAsyncThunk(
  types.GET_JOBS_BY_QUERY,
  async (data) => {
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
      throw error;
    }
  }
);

export const addNewJob = createAsyncThunk(types.ADD_NEW_JOB, async (data) => {
  const { job, navigate } = data;
  const apiEndpoint = `${apiEndpoints.job}/new`;
  try {
    const response = await baseAxios.post(apiEndpoint, job);
    navigate("/jobs");

    console.log(response);
    return response.data;
  } catch ({ response }) {
    console.log(response);
  }
});

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
    builder
      .addCase(getJobs.fulfilled, (state, action) => {
        const { totalRecords, data, queryParams, queryObj } = action.payload;
        state.queryParams = queryParams;
        state.queryObj = queryObj;
        state.jobs = data;
        state.total = totalRecords;
        state.loading = false;
      })
      .addCase(addNewJob.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addNewJob.fulfilled, (state, action) => {
        state.loading = false;
        state.job = jobModel;
        notify("success", "The job has been submitted successfully");
      })
      .addCase(addNewJob.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The job has been rejected");
      });
  },
});

export const { bindJob } = jobSlice.actions;

export default jobSlice.reducer;

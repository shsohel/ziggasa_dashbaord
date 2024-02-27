import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jobModel } from "./model";
import { baseAxios } from "../../services";
import { notify } from "../../utils/custom/Notification";
import { convertQueryString } from "../../utils/utility";
import { apiEndpoints } from "../../services/apis";
import { HttpStatusCode } from "axios";
import moment from "moment";

const types = {
  GET_JOBS_BY_QUERY: "GET_JOBS_BY_QUERY",
  ADD_NEW_JOB: "ADD_NEW_JOB",
  GET_JOB_BY_ID: "GET_JOB_BY_ID",
  UPDATE_JOB: "UPDATE_JOB",
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

const bindJobLocation = (location) => {
  let locationObj;
  if (location?.length) {
    const data = JSON.parse(location);
    locationObj = {
      jobCountry: {
        label: data.country,
        value: data.country,
      },
      jobState: {
        label: data.state,
        value: data.state,
      },
    };
  } else {
    locationObj = {
      jobCountry: null,
      jobState: null,
    };
  }
  return locationObj;
};

export const getJob = createAsyncThunk(types.GET_JOB_BY_ID, async (data) => {
  const { id } = data;
  const apiEndpoint = `${apiEndpoints.job}/${id}`;
  try {
    const response = await baseAxios.get(apiEndpoint);
    const dt = response.data.data;
    const job = {
      ...dt,
      ...bindJobLocation(dt.jobLocation),
      deadline: moment.utc(dt.deadline).local().format("YYYY-MM-DD HH:mm:ss"),
      keyword: dt.keyword.map((key) => ({
        label: key.name,
        value: key.id,
      })),
      category: dt.category.map((key) => ({
        label: key.name,
        value: key.id,
      })),
      tag: dt.tag.map((key) => ({
        label: key.name,
        value: key.id,
      })),
      benefits: dt.benefits.map((key) => ({
        label: key,
        value: key,
      })),
      skills: dt?.skills?.map((key) => ({
        label: key?.name,
        value: key?.id,
      })),
      company: {
        label: dt.organization.name,
        value: dt.organization.id,
      },
      jobType: {
        label: dt.jobType,
        value: dt.jobType,
      },
      currency: {
        label: dt.currency,
        value: dt.currency,
      },
    };

    return {
      data: job,
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

export const updateJob = createAsyncThunk(
  types.UPDATE_JOB,
  async (data, { dispatch }) => {
    const { job } = data;
    const apiEndpoint = `${apiEndpoints.job}/${job.id}`;
    try {
      const response = await baseAxios.put(apiEndpoint, job);

      if (response.status === HttpStatusCode.Ok) {
        notify("success", "The job has been updated successfully");

        dispatch(getJob({ id: job.id }));
        return {
          data: response.data.data,
          status: response?.status,
          statusText: response?.statusText,
        };
      }
    } catch ({ response }) {
      return {
        data: response?.data,
        status: response?.status,
        statusText: response?.statusText,
      };
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
    builder
      .addCase(getJobs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        const { totalRecords, data, queryParams, queryObj } = action.payload;
        state.queryParams = queryParams;
        state.queryObj = queryObj;
        state.jobs = data;
        state.total = totalRecords;
        state.loading = false;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The job has been rejected");
      })
      .addCase(addNewJob.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addNewJob.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;

        state.loading = false;

        if (status === HttpStatusCode.Created) {
          state.job = jobModel;
          notify("success", "The job has been submitted successfully");
        } else {
          notify("error", `${data.error}`);
        }
      })
      .addCase(addNewJob.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The job has been rejected");
      })
      .addCase(getJob.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getJob.fulfilled, (state, action) => {
        const { data } = action.payload;
        console.log(data);
        state.loading = false;
        state.job = data;
      })
      .addCase(getJob.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The job has been rejected");
      });
  },
});

export const { bindJob } = jobSlice.actions;

export default jobSlice.reducer;

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { apiEndpoints } from "../../services/apis";
import { baseAxios } from "../../services";
import { convertQueryString } from "../../utils/utility";
import { notify } from "../../utils/custom/Notification";
import { companyModel } from "./model";

import { HttpStatusCode } from "axios";
const types = {
  GET_COMPANY_DROPDOWN: "GET_COMPANY_DROPDOWN",
  GET_ALL_COMPANIES_BY_QUERY: "GET_ALL_COMPANIES_BY_QUERY",
  GET_COMPANY_BY_ID: "GET_COMPANY_BY_ID",
  ADD_COMPANY: "ADD_COMPANY",
  UPDATE_COMPANY: "UPDATE_COMPANY",
  DELETE_COMPANY: "DELETE_COMPANY",
};

//Get List Data by Query
export const getCompanies = createAsyncThunk(
  "GET_ALL_COMPANIES_BY_QUERY",
  async (data) => {
    const { queryParams, queryObj } = data;
    // console.log("filter", filter);
    const apiEndpoint = `${apiEndpoints.company}?${convertQueryString(
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

export const bindCompanyDropdown = createAsyncThunk(
  types.GET_COMPANY_DROPDOWN,
  async () => {
    const apiEndPoint = apiEndpoints.company;
    const res = await baseAxios.get(apiEndPoint);
    const dropdown = res.data.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    return dropdown;
  }
);

export const addCompany = createAsyncThunk(types.ADD_COMPANY, async (data) => {
  const apiEndPoint = `${apiEndpoints.company}/new`;

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
export const updateCompany = createAsyncThunk(
  types.UPDATE_COMPANY,
  async (data) => {
    const apiEndPoint = `${apiEndpoints.company}/${data.id}`;
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
export const deleteCompany = createAsyncThunk(
  types.DELETE_COMPANY,
  async (id) => {
    const apiEndPoint = `${apiEndpoints.company}/${id}`;
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

export const getCompany = createAsyncThunk(
  types.GET_COMPANY_BY_ID,
  async (id) => {
    const apiEndPoint = `${apiEndpoints.company}/${id}`;
    const res = await baseAxios.get(apiEndPoint);
    const data = res.data.data;

    const dt = {
      ...data,
    };
    return dt;
  }
);
const adaper = createEntityAdapter();

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    company: companyModel,
    total: 1,
    queryParams: {},
    queryObj: {},
    loading: false,
    companyDropdown: [],
    isCompanyDropdownLoaded: true,
    companySidebarOpen: false,
  },
  reducers: {
    bindCompanySidebar: (state, action) => {
      state.companySidebarOpen = action.payload;
    },
    bindCompany: (state, action) => {
      state.company = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state, action) => {
        state.companies = [];
        state.total = 0;
        state.loading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        const { totalRecords, data, queryParams, queryObj } = action.payload;
        state.companies = data;
        state.total = totalRecords;
        state.loading = false;
        state.queryParams = queryParams;
        state.queryObj = queryObj;
      })
      .addCase(getCompany.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.company = action.payload;
        state.companySidebarOpen = true;
        state.loading = false;
      })
      .addCase(bindCompanyDropdown.pending, (state, action) => {
        state.companyDropdown = [];
        state.isCompanyDropdownLoaded = false;
      })
      .addCase(bindCompanyDropdown.fulfilled, (state, action) => {
        state.companyDropdown = action.payload;
        state.isCompanyDropdownLoaded = true;
      })
      .addCase(addCompany.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;
        state.loading = false;

        if (status === HttpStatusCode.Created) {
          state.companySidebarOpen = false;
          state.company = companyModel;
          notify("success", "The Company has been created successfully");
        } else {
          notify("error", `${data.error}`);
        }
      })
      .addCase(addCompany.rejected, (state) => {
        state.loading = false;
        notify("error", "The operation was rejected!");
      })
      .addCase(updateCompany.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;

        state.loading = false;

        if (status === HttpStatusCode.Created) {
          state.companySidebarOpen = false;
          state.company = companyModel;
          notify("success", "The Company has been updated successfully");
        } else {
          notify("error", `${data?.error}`);
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The operation was rejected!");
      })
      .addCase(deleteCompany.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        const { status, data } = action.payload;
        console.log(action);
        state.loading = false;

        if (status === HttpStatusCode.Ok) {
          notify("success", "The Company has been deleted successfully");
        } else {
          notify("error", `${data?.error}`);
        }
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The operation was rejected!");
      });
  },
});
export const { bindCompanySidebar, bindCompany } = companySlice.actions;
export default companySlice.reducer;

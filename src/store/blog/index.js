import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogModel } from "./model";
import { baseAxios } from "../../services";
import { notify } from "../../utils/custom/Notification";
import { convertQueryString } from "../../utils/utility";

//Get List Data by Query
export const getBlogs = createAsyncThunk("blog/getBlogs", async (data) => {
  const { query, filterObj } = data;
  // console.log("filter", filter);
  const apiEndpoint = `/blog?${convertQueryString(query)}`;
  try {
    const response = await baseAxios.post(apiEndpoint, filterObj);
    return response.data;
  } catch (error) {
    if (error.response) {
      notify("warning", error.response.data.error);
    } else {
      notify("error", "An error occurred");
    }
    throw error;
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    dataProgress: false,
    submitUserDataProgress: false,
    openUserSidebar: false,
    blogs: [],
    blog: blogModel,
    total: 1,
    queryParams: {},
    queryObj: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      // "total": 25,
      // "success": true,
      // "totalRecords": 882,
      // "pagination": {
      //     "next": {
      //         "page": 2,
      //         "limit": 25
      //     }
      // },
      // "data": [
      const { totalRecords, data } = action.payload;
      state.blogs = data;
      state.total = totalRecords;
      state.loading = false;
    });
  },
});

export default blogSlice.reducer;

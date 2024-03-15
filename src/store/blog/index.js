import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogModel } from "./model";
import { baseAxios } from "../../services";
import { notify } from "../../utils/custom/Notification";
import { convertQueryString } from "../../utils/utility";
import { apiEndpoints } from "../../services/apis";
import { HttpStatusCode } from "axios";

const types = {
  GET_BLOGS_BY_QUERY: "GET_BLOGS_BY_QUERY",
  ADD_NEW_BLOG: "ADD_NEW_BLOG",
  GET_BLOG_BY_ID: "GET_BLOG_BY_ID",
  UPDATE_BLOG: "UPDATE_BLOG",
  DELETE_BLOG: "DELETE_BLOG",
};
//Get List Data by Query
export const getBlogs = createAsyncThunk(
  types.GET_BLOGS_BY_QUERY,
  async (data) => {
    const { queryParams, queryObj } = data;
    const apiEndpoint = `${apiEndpoints.blog}?${convertQueryString(
      queryParams
    )}`;
    try {
      const response = await baseAxios.post(apiEndpoint, queryObj);
      return {
        ...response.data,
        queryParams,
        queryObj,
      };
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

export const addNewBlog = createAsyncThunk(types.ADD_NEW_BLOG, async (data) => {
  const { blog, navigate } = data;
  const apiEndpoint = `${apiEndpoints.blog}/new`;

  try {
    const response = await baseAxios.post(apiEndpoint, blog);
    // const notifyEndPoint = `${apiEndpoints.notify}/send-notification`;

    //   const { title, slug, metaDescriptions } = response.data;
    //   const obj = {
    //     title: "New Job Circular Published",
    //     imageUrl:
    //       "https://res.cloudinary.com/dxczhch36/image/upload/v1710236045/ogy6md6mqr8inmy8expq.png", // Image URL
    //     details: "Additional details about the notification", // Additional details
    //     url: "https://youtube.com",
    //   };
    //   await baseAxios.post(notifyEndPoint, obj);

    navigate("/blogs");

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
export const getBlog = createAsyncThunk(types.GET_BLOG_BY_ID, async (data) => {
  const { id } = data;
  const apiEndpoint = `${apiEndpoints.blog}/${id}`;
  try {
    const response = await baseAxios.get(apiEndpoint);
    const dt = response.data.data;
    const blog = {
      ...dt,
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
      blogType: {
        label: dt.blogType,
        value: dt.blogType,
      },
    };

    return {
      data: blog,
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

export const updateBlog = createAsyncThunk(
  types.UPDATE_BLOG,
  async (data, { dispatch }) => {
    const { blog } = data;
    const apiEndpoint = `${apiEndpoints.blog}/${blog.id}`;
    try {
      const response = await baseAxios.put(apiEndpoint, blog);

      if (response.status === HttpStatusCode.Ok) {
        notify("success", "The blog has been updated successfully");

        dispatch(getBlog({ id: blog.id }));
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

export const deleteBlog = createAsyncThunk(
  types.DELETE_BLOG,
  async (id, { dispatch, getState }) => {
    const { queryParams, queryObj } = getState().blog;
    const apiEndPoint = `${apiEndpoints.blog}/${id}`;
    try {
      const response = await baseAxios.delete(apiEndPoint);

      if (response?.status === HttpStatusCode.Ok) {
        dispatch(getBlogs({ queryParams, queryObj }));
        return {
          data: response?.data,
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
  reducers: {
    bindBlog: (state, action) => {
      if (action.payload) {
        state.blog = action.payload;
      } else {
        state.blog = blogModel;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        const { totalRecords, data, queryParams, queryObj } = action.payload;
        state.queryParams = queryParams;
        state.queryObj = queryObj;
        state.blogs = data;
        state.total = totalRecords;
        state.loading = false;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The blog has been rejected");
      })
      .addCase(addNewBlog.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;

        console.log(action.payload);
        state.loading = false;

        if (status === HttpStatusCode.Created) {
          state.blog = blogModel;
          notify("success", "The blog has been submitted successfully");
        } else {
          notify("error", `${data.error}`);
        }
      })
      .addCase(addNewBlog.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The blog has been rejected");
      })
      .addCase(getBlog.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.loading = false;
        state.blog = data;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The blog has been rejected");
      })
      .addCase(deleteBlog.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const { status, data } = action.payload;

        // state.loading = false;

        if (status === HttpStatusCode.Ok) {
          notify("success", "The Blog has been deleted successfully");
        } else {
          notify("error", `${data?.error}`);
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        notify("error", "The operation was rejected!");
      });
  },
});

export const { bindBlog } = blogSlice.actions;

export default blogSlice.reducer;

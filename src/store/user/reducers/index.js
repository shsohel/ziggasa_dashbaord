import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseAxios } from "../../../services";
import { notify } from "../../../utils/custom/Notification";
import { userBasicInfoModal } from "../model";

//Get List Data by Query
export const getAllUsers = createAsyncThunk("user/getUsers", async () => {
  const apiEndpoint = `/user`;
  try {
    const response = await baseAxios.post(apiEndpoint, []);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      notify("warning", error.response.data.error);
    } else {
      notify("error", "An error occurred");
    }
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    dataProgress: false,
    submitUserDataProgress: false,
    openUserSidebar: false,
    users: [],
    user: userBasicInfoModal,
    total: 1,
    queryParams: {},
    queryObj: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;

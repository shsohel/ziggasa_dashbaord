import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseAxios } from "../../services";
import { notify } from "../../utils/custom/Notification";
import { userBasicInfoModal } from "./model";

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

//Add new user by this function
export const addNewUser = createAsyncThunk("user/addNewUser", async (data) => {
  const apiEndpoint = `/users/new`;
  try {
    const response = await baseAxios.post(apiEndpoint, data);
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

// export const userDataOnProgress = (condition) => (dispatch) => {
//     dispatch({
//       type: USER_DATA_ON_PROGRESS,
//       dataProgress: condition,
//     });
//   };
//   export const userDataSubmitOnProgress = (condition) => (dispatch) => {
//     dispatch({
//       type: USER_DATA_SUBMIT_PROGRESS,
//       submitUserDataProgress: condition,
//     });
//   };
//   export const userSidebarOpen = (condition) => (dispatch) => {
//     dispatch({
//       type: OPEN_USER_SIDEBAR,
//       openUserSidebar: condition,
//     });
//   };
//   export const bindUserBasicInfo = (user) => (dispatch) => {
//     console.log('first');
//     dispatch({
//       type: BIND_USER_BASIC_INFO,
//       user,
//     });
//   };

//   //Get List Data by Query
//   export const getUsers = (queryParams, queryObj) => async (dispatch) => {
//     dispatch(userDataOnProgress(true));
//     const apiEndpoint = `/api/user?${convertQueryString(queryParams)}`;
//     await axios
//       .post(apiEndpoint, queryObj)
//       .then((response) => {
//         if (response.status === 200) {
//           dispatch({
//             type: GET_USERS_BY_QUERY,
//             users: response.data.data,
//             total: response.data.totalRecords,
//             queryParams,
//             queryObj,
//           });
//           dispatch(userDataOnProgress(false));
//         }
//       })
//       .catch(({ response }) => {
//         if (response.status === 400) {
//           notify('warning', response.data.error);
//         } else if (response.status === 401) {
//           notify('errror', response.data.error);
//         }
//         dispatch(userDataOnProgress(false));
//         dispatch({
//           type: GET_USERS_BY_QUERY,
//           users: [],
//           total: 0,
//           queryParams,
//           queryObj,
//         });
//       });
//   };

//   export const addUser = (user, redirectCallBack) => (dispatch) => {
//     const apiEndpoint = `/api/user/create`;
//     dispatch(userDataSubmitOnProgress(true));
//     axios
//       .post(apiEndpoint, user)
//       .then((response) => {
//         if (response.status === 201) {
//           dispatch(userDataSubmitOnProgress(false));
//           dispatch(bindUserBasicInfo(userBasicInfoModal));
//           notify('success', 'The User has been added successfully');

//           redirectCallBack(response.data.data.slug);
//         }
//       })
//       .catch(({ response }) => {
//         console.log(response);
//         if (response.status === 400) {
//           notify('error', `${response.data.error}`);
//         }
//       });
//   };

//   export const getUser = (User) => async (dispatch, getState) => {
//     dispatch(userDataOnProgress(true));
//     const apiEndpoint = `/api/user/${User._id}`;
//     await axios
//       .get(apiEndpoint)
//       .then((response) => {
//         if (response.status === status.success) {
//           const { data } = response.data;
//           console.log('data', data);
//           const UserObj = {
//             ...data,
//             subCategories: data.userSubCategories.map((v) => ({
//               value: v._id,
//               label: v.name,
//             })),
//           };
//           dispatch(bindUserBasicInfo(UserObj));
//           dispatch(userSidebarOpen(true));
//           dispatch(userDataOnProgress(false));
//         }
//       })
//       .catch(({ response }) => {
//         console.log(response);
//         dispatch(userDataOnProgress(false));
//         if (response?.status === status.severError) {
//           notify('error', `Please contact the support team!!!`);
//         } else if (response?.status === status.badRequest) {
//           notify('errors', response.data.error);
//         }
//       });
//   };
//   export const getUserBySlug = (slug, router) => async (dispatch, getState) => {
//     dispatch(userDataOnProgress(true));
//     const apiEndpoint = `/api/user/get/${slug}`;
//     await axios
//       .get(apiEndpoint)
//       .then((response) => {
//         if (response.status === status.success) {
//           const { data } = response.data;
//           console.log(data);
//           const obj = {
//             ...userBasicInfoModal,
//             _id: data._id,
//             name: data.name,
//             email: data.email,
//             image: data.photoUrl,
//             slug: data.slug,
//             role: {
//               label: capitalizeFirstLetter(data.role),
//               value: capitalizeFirstLetter(data.role),
//             },
//             isActive: data.isActive,
//           };
//           dispatch(bindUserBasicInfo(obj));
//           dispatch(userDataOnProgress(false));
//         }
//       })
//       .catch(({ response }) => {
//         if (response.status === 400) {
//           router.push('/404');
//         }
//         console.log(response);
//         dispatch(userDataOnProgress(false));
//         // if (response?.status === status.severError) {
//         //   notify('error', `Please contact the support team!!!`);
//         // } else if (response?.status === status.badRequest) {
//         //   notify('errors', response.data.error);
//         // }
//       });
//   };
//   export const updateUser =
//     (user, redirectCallBack) => async (dispatch, getState) => {
//       dispatch(userDataSubmitOnProgress(true));
//       const apiEndpoint = `/api/user/${user._id}`;
//       await axios
//         .put(apiEndpoint, user)
//         .then((response) => {
//           if (response.status === status.success) {
//             dispatch(userDataSubmitOnProgress(false));
//             notify('success', `The User has been updated successfully `);
//             redirectCallBack(response.data.data.slug);
//           }
//         })
//         .catch(({ response }) => {
//           console.log(response);
//           dispatch(userDataSubmitOnProgress(false));
//           if (response?.status === status.severError) {
//             notify('error', `Please contact the support team!!!`);
//           } else if (response?.status === status.badRequest) {
//             notify('error', response.data.error);
//           }
//         });
//     };
//   export const updateUserPassword =
//     (user, redirectCallBack) => async (dispatch, getState) => {
//       dispatch(userDataSubmitOnProgress(true));
//       const apiEndpoint = `/api/user/${user._id}`;
//       await axios
//         .patch(apiEndpoint, user)
//         .then((response) => {
//           if (response.status === status.success) {
//             dispatch(userDataSubmitOnProgress(false));
//             notify('success', `The User Password has been updated successfully `);
//             redirectCallBack();
//           }
//         })
//         .catch(({ response }) => {
//           dispatch(userDataSubmitOnProgress(false));
//           if (response?.status === status.severError) {
//             notify('error', `Please contact the support team!!!`);
//           } else if (response?.status === status.badRequest) {
//             notify('error', response.data.error);
//           }
//         });
//     };

//   // ...confirmObj,
//   // text: `<h4 class="text-primary mb-0">${item.itemNumber}</h4> <br/> <span>You can't retrieve again!</span>`,

//   // Delete item
//   export const deleteUser = (user) => (dispatch, getState) => {
//     confirmDialog(confirmObj).then(async (e) => {
//       if (e.isConfirmed) {
//         const apiEndpoint = `/api/user/${user._id}`;
//         console.log(apiEndpoint);
//         dispatch(userDataOnProgress(true));
//         await axios
//           .delete(apiEndpoint)
//           .then((response) => {
//             if (response.status === status.success) {
//               const { queryParams, queryObj } = getState().users;

//               notify('success', 'The Item  has been deleted Successfully!');
//               dispatch(getUsers(queryParams, queryObj));
//               dispatch(userDataOnProgress(false));
//             }
//           })
//           .catch(({ response }) => {
//             console.log(response);
//             dispatch(userDataOnProgress(false));
//             if (response.status === status.severError) {
//               notify('error', `Please contact the support team!!!`);
//             } else if (response?.status === status.badRequest) {
//               notify('errors', response.data.error);
//             }
//           });
//       }
//     });
//   };

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
  reducers: {
    bindUserBasicInfo: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      } else {
        state.user = userBasicInfoModal;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The job has been rejected");
      })
      .addCase(addNewUser.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { bindUserBasicInfo } = userSlice.actions;

export default userSlice.reducer;

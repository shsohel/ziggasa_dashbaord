import axios from 'axios';

import { notify } from "../../../utils/custom/Notification";
import { confirmObj, status } from "../../../utils/enum";
import {
  capitalizeFirstLetter,
  convertQueryString,
  uniqId,
} from "../../../utils/utolity";
import {
  USER_DATA_ON_PROGRESS,
  USER_DATA_SUBMIT_PROGRESS,
  BIND_USER_BASIC_INFO,
  GET_USERS_BY_QUERY,
  GET_USER_BY_ID,
  OPEN_USER_SIDEBAR,
  BIND_USER_ATTRIBUTES,
} from "../action-types";
import { userBasicInfoModal } from "../model";
import { confirmDialog } from "@/components/customs/ConfirmDialogue";

export const userDataOnProgress = (condition) => (dispatch) => {
  dispatch({
    type: USER_DATA_ON_PROGRESS,
    dataProgress: condition,
  });
};
export const userDataSubmitOnProgress = (condition) => (dispatch) => {
  dispatch({
    type: USER_DATA_SUBMIT_PROGRESS,
    submitUserDataProgress: condition,
  });
};
export const userSidebarOpen = (condition) => (dispatch) => {
  dispatch({
    type: OPEN_USER_SIDEBAR,
    openUserSidebar: condition,
  });
};
export const bindUserBasicInfo = (user) => (dispatch) => {
  console.log('first');
  dispatch({
    type: BIND_USER_BASIC_INFO,
    user,
  });
};

//Get List Data by Query
export const getUsers = (queryParams, queryObj) => async (dispatch) => {
  dispatch(userDataOnProgress(true));
  const apiEndpoint = `/api/user?${convertQueryString(queryParams)}`;
  await axios
    .post(apiEndpoint, queryObj)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_USERS_BY_QUERY,
          users: response.data.data,
          total: response.data.totalRecords,
          queryParams,
          queryObj,
        });
        dispatch(userDataOnProgress(false));
      }
    })
    .catch(({ response }) => {
      if (response.status === 400) {
        notify('warning', response.data.error);
      } else if (response.status === 401) {
        notify('errror', response.data.error);
      }
      dispatch(userDataOnProgress(false));
      dispatch({
        type: GET_USERS_BY_QUERY,
        users: [],
        total: 0,
        queryParams,
        queryObj,
      });
    });
};

export const addUser = (user, redirectCallBack) => (dispatch) => {
  const apiEndpoint = `/api/user/create`;
  dispatch(userDataSubmitOnProgress(true));
  axios
    .post(apiEndpoint, user)
    .then((response) => {
      if (response.status === 201) {
        dispatch(userDataSubmitOnProgress(false));
        dispatch(bindUserBasicInfo(userBasicInfoModal));
        notify('success', 'The User has been added successfully');

        redirectCallBack(response.data.data.slug);
      }
    })
    .catch(({ response }) => {
      console.log(response);
      if (response.status === 400) {
        notify('error', `${response.data.error}`);
      }
    });
};

export const getUser = (User) => async (dispatch, getState) => {
  dispatch(userDataOnProgress(true));
  const apiEndpoint = `/api/user/${User._id}`;
  await axios
    .get(apiEndpoint)
    .then((response) => {
      if (response.status === status.success) {
        const { data } = response.data;
        console.log('data', data);
        const UserObj = {
          ...data,
          subCategories: data.userSubCategories.map((v) => ({
            value: v._id,
            label: v.name,
          })),
        };
        dispatch(bindUserBasicInfo(UserObj));
        dispatch(userSidebarOpen(true));
        dispatch(userDataOnProgress(false));
      }
    })
    .catch(({ response }) => {
      console.log(response);
      dispatch(userDataOnProgress(false));
      if (response?.status === status.severError) {
        notify('error', `Please contact the support team!!!`);
      } else if (response?.status === status.badRequest) {
        notify('errors', response.data.error);
      }
    });
};
export const getUserBySlug = (slug, router) => async (dispatch, getState) => {
  dispatch(userDataOnProgress(true));
  const apiEndpoint = `/api/user/get/${slug}`;
  await axios
    .get(apiEndpoint)
    .then((response) => {
      if (response.status === status.success) {
        const { data } = response.data;
        console.log(data);
        const obj = {
          ...userBasicInfoModal,
          _id: data._id,
          name: data.name,
          email: data.email,
          image: data.photoUrl,
          slug: data.slug,
          role: {
            label: capitalizeFirstLetter(data.role),
            value: capitalizeFirstLetter(data.role),
          },
          isActive: data.isActive,
        };
        dispatch(bindUserBasicInfo(obj));
        dispatch(userDataOnProgress(false));
      }
    })
    .catch(({ response }) => {
      if (response.status === 400) {
        router.push('/404');
      }
      console.log(response);
      dispatch(userDataOnProgress(false));
      // if (response?.status === status.severError) {
      //   notify('error', `Please contact the support team!!!`);
      // } else if (response?.status === status.badRequest) {
      //   notify('errors', response.data.error);
      // }
    });
};
export const updateUser =
  (user, redirectCallBack) => async (dispatch, getState) => {
    dispatch(userDataSubmitOnProgress(true));
    const apiEndpoint = `/api/user/${user._id}`;
    await axios
      .put(apiEndpoint, user)
      .then((response) => {
        if (response.status === status.success) {
          dispatch(userDataSubmitOnProgress(false));
          notify('success', `The User has been updated successfully `);
          redirectCallBack(response.data.data.slug);
        }
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(userDataSubmitOnProgress(false));
        if (response?.status === status.severError) {
          notify('error', `Please contact the support team!!!`);
        } else if (response?.status === status.badRequest) {
          notify('error', response.data.error);
        }
      });
  };
export const updateUserPassword =
  (user, redirectCallBack) => async (dispatch, getState) => {
    dispatch(userDataSubmitOnProgress(true));
    const apiEndpoint = `/api/user/${user._id}`;
    await axios
      .patch(apiEndpoint, user)
      .then((response) => {
        if (response.status === status.success) {
          dispatch(userDataSubmitOnProgress(false));
          notify('success', `The User Password has been updated successfully `);
          redirectCallBack();
        }
      })
      .catch(({ response }) => {
        dispatch(userDataSubmitOnProgress(false));
        if (response?.status === status.severError) {
          notify('error', `Please contact the support team!!!`);
        } else if (response?.status === status.badRequest) {
          notify('error', response.data.error);
        }
      });
  };

// ...confirmObj,
// text: `<h4 class="text-primary mb-0">${item.itemNumber}</h4> <br/> <span>You can't retrieve again!</span>`,

// Delete item
export const deleteUser = (user) => (dispatch, getState) => {
  confirmDialog(confirmObj).then(async (e) => {
    if (e.isConfirmed) {
      const apiEndpoint = `/api/user/${user._id}`;
      console.log(apiEndpoint);
      dispatch(userDataOnProgress(true));
      await axios
        .delete(apiEndpoint)
        .then((response) => {
          if (response.status === status.success) {
            const { queryParams, queryObj } = getState().users;

            notify('success', 'The Item  has been deleted Successfully!');
            dispatch(getUsers(queryParams, queryObj));
            dispatch(userDataOnProgress(false));
          }
        })
        .catch(({ response }) => {
          console.log(response);
          dispatch(userDataOnProgress(false));
          if (response.status === status.severError) {
            notify('error', `Please contact the support team!!!`);
          } else if (response?.status === status.badRequest) {
            notify('errors', response.data.error);
          }
        });
    }
  });
};

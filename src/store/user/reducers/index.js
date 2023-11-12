import {
  GET_USERS_BY_QUERY,
  GET_USER_BY_ID,
  USER_DATA_ON_PROGRESS,
  USER_DATA_SUBMIT_PROGRESS,
  OPEN_USER_SIDEBAR,
  BIND_USER_BASIC_INFO,
} from "../action-types";
import { userBasicInfoModal } from "../model";

const initialState = {
  dataProgress: false,
  submitUserDataProgress: false,
  openUserSidebar: false,
  users: [],
  user: userBasicInfoModal,
  total: 1,
  queryParams: {},
  queryObj: {},
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_BY_QUERY:
      return {
        ...state,
        users: action.users,
        total: action.total,
        queryParams: action.queryParams,
        queryObj: action.queryObj,
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        user: action.user,
      };
    case BIND_USER_BASIC_INFO:
      return {
        ...state,
        user: action.user,
      };

    case USER_DATA_ON_PROGRESS:
      return {
        ...state,
        dataProgress: action.dataProgress,
      };

    case USER_DATA_SUBMIT_PROGRESS:
      return {
        ...state,
        submitUserDataProgress: action.submitUserDataProgress,
      };
    case OPEN_USER_SIDEBAR:
      return {
        ...state,
        openUserSidebar: action.openUserSidebar,
      };

    default:
      return state;
  }
};
export default userReducers;

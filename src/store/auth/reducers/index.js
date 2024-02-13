/** @format */

import { BIND_TOKEN, GET_AUTH_USER } from "../action-types";

const initialState = {
  authUser: null,
  token: null,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_USER:
      return {
        ...state,
        authUser: action.authUser,
      };
    case BIND_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
};
export default authReducers;

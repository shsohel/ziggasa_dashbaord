import { GET_AUTH_USER } from '../action-types';

const initialState = {
  authUser: null,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_USER:
      return {
        ...state,
        authUser: action.authUser,
      };

    default:
      return state;
  }
};
export default authReducers;

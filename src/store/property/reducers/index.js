/** @format */

import {
  BIND_PROPERTY_INFO,
  GET_ALL_PROPERTIES_BY_QUERY,
  GET_USER_PROPERTIES,
} from '../action-types';
import { propertyModel } from '../models';

const initialState = {
  allProperties: [],
  propertyInfo: propertyModel,
  userProperties: [],
  queryObj: {},
  total: {},
};

const propertyReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROPERTIES_BY_QUERY:
      return {
        ...state,
        queryObj: action.queryObj,
        total: action.total,
        allProperties: action.allProperties,
      };
    case GET_USER_PROPERTIES:
      return {
        ...state,
        userProperties: action.userProperties,
        queryObj: action.queryObj,
        total: action.total,
      };
    case BIND_PROPERTY_INFO:
      return {
        ...state,
        propertyInfo: action.propertyInfo,
      };

    default:
      return state;
  }
};
export default propertyReducers;

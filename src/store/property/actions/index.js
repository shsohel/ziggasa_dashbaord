/** @format */

import axios from 'axios';
import {
  BIND_PROPERTY_INFO,
  GET_ALL_PROPERTIES_BY_QUERY,
  GET_USER_PROPERTIES,
} from '../action-types';
import { propertyModel } from '../models';
import { dataOnProgress } from '@/store/basic/actions';
import { notify } from '@/utils/custom/Notification';
import { confirmDialog } from '@/components/customs/ConfirmDialogue';
import { confirmObj, status } from '@/utils/enum';
import moment from 'moment';

export const bindPropertyBasic = (propertyInfo) => (dispatch) => {
  if (propertyInfo) {
    dispatch({
      type: BIND_PROPERTY_INFO,
      propertyInfo,
    });
  } else {
    dispatch({
      type: BIND_PROPERTY_INFO,
      propertyInfo: propertyModel,
    });
  }
};
export const getUserPropertyById = (id) => async (dispatch, getState) => {
  dispatch(dataOnProgress(true));
  const apiEndpoint = `/api/property/${id}`;
  await axios
    .get(apiEndpoint)
    .then((response) => {
      if (response.status === status.success) {
        const { data } = response.data;
        // console.log('data', data);
        // const UserObj = {
        //   ...data,
        //   subCategories: data.userSubCategories.map((v) => ({
        //     value: v._id,
        //     label: v.name,
        //   })),
        // };
        const obj = {
          ...data,
          category: data.category?.length
            ? {
                label: data.category,
                value: data.category,
              }
            : null,
          propertyType: data.propertyType?.length
            ? {
                label: data.propertyType,
                value: data.propertyType,
              }
            : null,
          propertyStatus: data.propertyStatus?.length
            ? {
                label: data.propertyStatus,
                value: data.propertyStatus,
              }
            : null,
          structureType: data.structureType?.length
            ? {
                label: data.structureType,
                value: data.structureType,
              }
            : null,
          amenities: propertyModel.amenities.map((am) => {
            if (data.amenities.some((dt) => dt === am.name)) {
              am['isSelect'] = true;
            }
            return am;
          }),
          availableFrom: data?.availableFrom
            ? moment(data?.availableFrom).format('YYYY-MM-DD')
            : '',
          country: '',
          state: '',
          city: '',
          street: '',
          zipCode: '',
        };

        dispatch(bindPropertyBasic(obj));
        dispatch(dataOnProgress(false));
      }
    })
    .catch((error) => {
      console.log(error);
    });
  // .catch(({ response }) => {
  //   console.log(response);
  //   dispatch(dataOnProgress(false));
  //   if (response?.status === status.severError) {
  //     notify('error', `Please contact the support team!!!`);
  //   } else if (response?.status === status.badRequest) {
  //     notify('errors', response.data.error);
  //   }
  // });
};
export const postPoperies = (propertyInfo, callback) => (dispatch) => {
  dispatch(dataOnProgress(true));

  const apiEndpoint = `/api/property/create`;
  axios
    .post(apiEndpoint, propertyInfo)
    .then((response) => {
      if (response.status === 201) {
        callback(response.data.data);
        notify('success', 'The Item  has been created Successfully!');
      }
    })
    .catch(({ response }) => {
      console.log(response);
      dispatch(dataOnProgress(false));
      if (response?.status === 500) {
        notify('error', `Please contact the support team!!!`);
      } else if (response?.status === 400) {
        notify('error', response.data.message);
      }
    });
};
export const updatePoperies = (propertyInfo, id) => (dispatch) => {
  dispatch(dataOnProgress(true));

  const apiEndpoint = `/api/property/${id}`;
  axios
    .put(apiEndpoint, propertyInfo)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserPropertyById(id));
        notify('success', 'The Item  has been updated Successfully!');
      }
    })
    .catch(({ response }) => {
      console.log(response);
      dispatch(dataOnProgress(false));
      if (response?.status === 500) {
        notify('error', `Please contact the support team!!!`);
      } else if (response?.status === 400) {
        notify('error', response.data.message);
      }
    });
};
export const getUserProperties = (queryObj) => (dispatch) => {
  dispatch(dataOnProgress(true));
  const apiEndpoint = `/api/property/users`;
  axios
    .post(apiEndpoint, queryObj)
    .then((response) => {
      if (response.status === 200) {
        const data = response.data.data;
        dispatch({
          type: GET_USER_PROPERTIES,
          userProperties: data,
          queryObj,
          total: response.data.total,
        });
        dispatch(dataOnProgress(false));
      }
    })
    .catch((error) => {
      notify('Error', 'Please contact the support team');
      dispatch(dataOnProgress(false));
    });
};
export const getPropertiesByQuery = (queryObj) => (dispatch) => {
  dispatch(dataOnProgress(true));
  const apiEndpoint = `/api/property`;
  axios
    .post(apiEndpoint, queryObj)
    .then((response) => {
      if (response.status === 200) {
        const data = response.data.data;
        dispatch({
          type: GET_ALL_PROPERTIES_BY_QUERY,
          allProperties: data,
          queryObj,
          total: response.data.total,
        });
        dispatch(dataOnProgress(false));
      }
    })
    .catch((error) => {
      notify('Error', 'Please contact the support team');
      dispatch(dataOnProgress(false));
    });
};

export const deleteProperties = (id) => (dispatch, getState) => {
  confirmDialog(confirmObj).then(async (e) => {
    if (e.isConfirmed) {
      const apiEndpoint = `/api/property/${id}`;
      console.log(apiEndpoint);
      dispatch(dataOnProgress(true));
      await axios
        .delete(apiEndpoint)
        .then((response) => {
          if (response.status === status.success) {
            const { queryObj } = getState().propertyReducers;

            notify('success', 'The Item  has been deleted Successfully!');
            dispatch(getUserProperties(queryObj));
            dispatch(dataOnProgress(false));
          }
        })
        .catch(({ response }) => {
          console.log(response);
          dispatch(dataOnProgress(false));
          if (response?.status === 500) {
            notify('error', `Please contact the support team!!!`);
          } else if (response?.status === 400) {
            notify('error', response.data.message);
          }
        });
    }
  });
};

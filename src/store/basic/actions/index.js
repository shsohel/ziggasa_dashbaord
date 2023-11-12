import axios from 'axios';
import {
  GET_COUNTRY_WISE_DROPDOWN,
  IS_DATA_PROGRESS,
  IS_DATA_SUBMIT_PROGRESS,
} from '../action-types';

export const dataOnProgress = (condition) => (dispatch) => {
  dispatch({
    type: IS_DATA_PROGRESS,
    isDataProgress: condition,
  });
};
export const dataSubmitOnProgress = (condition) => (dispatch) => {
  dispatch({
    type: IS_DATA_SUBMIT_PROGRESS,
    isDataSubmitProgress: condition,
  });
};

export const getCountryWiseDropdown = () => (dispatch) => {
  const apiEndPoint = `/api/basic/country`;
  dispatch({
    type: GET_COUNTRY_WISE_DROPDOWN,
    countryDropdown: [],
    isCountryDropdownLoaded: false,
  });
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: GET_COUNTRY_WISE_DROPDOWN,
        countryDropdown: response?.data?.data ?? [],
        isCountryDropdownLoaded: true,
      });
    })
    .catch(({ response }) => {
      console.log('hello');
      dispatch({
        type: GET_COUNTRY_WISE_DROPDOWN,
        countryDropdown: [],
        isCountryDropdownLoaded: false,
      });
    });
};

import { countriesOption } from '../../../utils/enum';
import {
  GET_COUNTRY_WISE_DROPDOWN,
  IS_DATA_PROGRESS,
  IS_DATA_SUBMIT_PROGRESS,
} from '../action-types';

const initialState = {
  countryDropdown: countriesOption,
  isCountryDropdownLoaded: true,
  isDataProgress: false,
  isDataSubmitProgress: false,
};

const basicReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRY_WISE_DROPDOWN:
      return {
        ...state,
        countryDropdown: action.countryDropdown,
        isCountryDropdownLoaded: action.isCountryDropdownLoaded,
      };

    case IS_DATA_PROGRESS:
      return {
        ...state,
        isDataProgress: action.isDataProgress,
      };
    case IS_DATA_SUBMIT_PROGRESS:
      return {
        ...state,
        isDataSubmitProgress: action.isDataSubmitProgress,
      };

    default:
      return state;
  }
};

export default basicReducers;

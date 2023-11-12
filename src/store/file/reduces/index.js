import { PRODUCT_IMAGE_UPLOAD } from '../action-types';

const initialState = {};

const fileReducers = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_IMAGE_UPLOAD:
      return {
        ...state,
        submitProductCategoryDataProgress:
          action.submitProductCategoryDataProgress,
      };

    default:
      return state;
  }
};
export default fileReducers;

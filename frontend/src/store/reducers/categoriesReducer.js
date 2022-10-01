import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS
} from "../actions/categoiesActions";

const initialState = {
  categories: [],
  fetchLoading: false,
  fetchError: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {...state, fetchLoading: true};
    case FETCH_CATEGORIES_SUCCESS:
      return {...state, fetchLoading: false, categories: action.payload};
    case FETCH_CATEGORIES_FAILURE:
      return {...state, fetchLoading: false, fetchError: action.payload};

    default:
      return state;
  }
};

export default categoriesReducer;
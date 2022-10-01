import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS
} from "../actions/prodcutsActions";

const initialState = {
  products: [],
  product: null,
  fetchLoading: false,
  singleLoading: false,
  fetchError: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {...state, singleLoading: true};
    case FETCH_PRODUCT_SUCCESS:
      return {...state, singleLoading: false, product: action.payload};
    case FETCH_PRODUCT_FAILURE:
      return {...state, singleLoading: false, fetchError: action.payload};

    case FETCH_PRODUCTS_REQUEST:
      return {...state, fetchLoading: true};
    case FETCH_PRODUCTS_SUCCESS:
      return {...state, fetchLoading: false, products: action.payload};
    case FETCH_PRODUCTS_FAILURE:
      return {...state, fetchLoading: false, fetchError: action.payload};

    case CREATE_PRODUCT_REQUEST:
      return {...state, fetchLoading: true};
    case CREATE_PRODUCT_SUCCESS:
      return {...state, fetchLoading: false};
    case CREATE_PRODUCT_FAILURE:
      return {...state, fetchLoading: false, fetchError: action.payload};

    case DELETE_PRODUCT_REQUEST:
      return {...state, singleLoading: true};
    case DELETE_PRODUCT_SUCCESS:
      return {...state, singleLoading: false};
    case DELETE_PRODUCT_FAILURE:
      return {...state, singleLoading: false, fetchError: action.payload};
    default:
      return state;
  }
};

export default productsReducer;
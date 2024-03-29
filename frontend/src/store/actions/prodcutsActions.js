import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

const fetchProductRequest = () => ({type: FETCH_PRODUCT_REQUEST});
const fetchProductSuccess = product => ({type: FETCH_PRODUCT_SUCCESS, payload: product});
const fetchProductFailure = error => ({type: FETCH_PRODUCT_FAILURE, payload: error});

const fetchProductsRequest = () => ({type: FETCH_PRODUCTS_REQUEST});
const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, payload: products});
const fetchProductsFailure = error => ({type: FETCH_PRODUCTS_FAILURE, payload: error});

const createProductRequest = () => ({type: CREATE_PRODUCT_REQUEST});
const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
const createProductFailure = error => ({type: CREATE_PRODUCT_FAILURE, payload: error});

const deleteProductRequest = () => ({type: DELETE_PRODUCT_REQUEST});
const deleteProductSuccess = () => ({type: DELETE_PRODUCT_SUCCESS});
const deleteProductFailure = error => ({type: DELETE_PRODUCT_FAILURE, payload: error});

export const fetchProduct = id => {
  return async dispatch => {
    try {
      dispatch(fetchProductRequest());

      const response = await axiosApi('/products/' + id);

      dispatch(fetchProductSuccess(response.data));
    } catch (e) {
      dispatch(fetchProductFailure(e.message));
    }
  }
};

export const fetchProducts = (query) => {
  return async dispatch => {
    try {
      dispatch(fetchProductsRequest());

      const response = await axiosApi('/products' + query);

      dispatch(fetchProductsSuccess(response.data));
    } catch (e) {
      dispatch(fetchProductsFailure(e.message));
    }
  }
};

export const createProduct = (productData) => {
  return async (dispatch, getState) => {
    try {
      const headers = {
        'Authorization': getState().users.user && getState().users.user.token,
      };

      dispatch(createProductRequest());
      await axiosApi.post('/products', productData, {headers});
      dispatch(createProductSuccess());
      toast.success('You created product!', {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(createProductFailure(e.response.data));
      } else {
        if (e.response.status === 401) {
          toast.warn('You need login!', {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        dispatch(createProductFailure({global: 'No internet'}));
      }
      throw e;
    }
  }
};

export const deleteProduct = id => {
  return async (dispatch, getState) => {
    try {
      const headers = {
        'Authorization': getState().users.user && getState().users.user.token,
      };

      dispatch(deleteProductRequest());

      await axiosApi.delete('/products/' + id, {headers});

      dispatch(deleteProductSuccess());
      toast.success('You deleted product!', {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      dispatch(deleteProductFailure(e));
      throw e;
    }
  }
};
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, fetchProduct} from "../../store/actions/prodcutsActions";
import {Box, CircularProgress} from "@mui/material";
import FullProduct from "../../components/FullProduct/FullProduct";

const Product = ({match, history}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const product = useSelector(state => state.products.product);
  const loading = useSelector(state => state.products.singleLoading);

  useEffect(() => {
    dispatch(fetchProduct(match.params.id));
  }, [dispatch, match.params.id]);

  const onDeleteProduct = async () => {
    await dispatch(deleteProduct(match.params.id));
    history.replace('/');
  };

  return loading ? <Box sx={{textAlign: 'center'}}><CircularProgress/></Box> : (
     product && <FullProduct product={product} user={user} onDeleteProduct={onDeleteProduct}/>
  );
};

export default Product;
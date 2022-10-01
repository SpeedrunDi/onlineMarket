import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct} from "../../store/actions/prodcutsActions";
import {Box, CircularProgress} from "@mui/material";
import FullProduct from "../../components/FullProduct/FullProduct";

const Product = ({match}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const product = useSelector(state => state.products.product);
  const loading = useSelector(state => state.products.singleLoading);

  useEffect(() => {
    dispatch(fetchProduct(match.params.id));
  }, [dispatch, match.params.id]);

  return loading ? <Box sx={{textAlign: 'center'}}><CircularProgress/></Box> : (
     product && <FullProduct product={product} user={user}/>
  );
};

export default Product;
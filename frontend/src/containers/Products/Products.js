import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import {fetchProducts} from "../../store/actions/prodcutsActions";
import ProductItem from "../../components/ProductItem/ProductItem";

const Products = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.products.fetchLoading);
  const products = useSelector(state => state.products.products);
  const query = useLocation().search;

  useEffect(() => {
    dispatch(fetchProducts(query));
  }, [dispatch, query]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">
            Products
          </Typography>
        </Grid>
      </Grid>
      {loading
        ? <Box sx={{textAlign: 'center'}}><CircularProgress/></Box>
        : <Grid item container spacing={3}>
          {products.map(product => (
            <ProductItem
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </Grid>
      }
    </Grid>
  );
};

export default Products;
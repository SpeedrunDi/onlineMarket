import React from 'react';
import {Box} from "@mui/material";
import AppDrawer from "../AppDrawer/AppDrawer";
import Products from "../../../containers/Products/Products";

const ProductsLayout = () => {
  return (
    <>
      <AppDrawer/>
      <Box paddingLeft="240px">
        <Products/>
      </Box>
    </>
  );
};

export default ProductsLayout;
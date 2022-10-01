import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import ProductForm from "../../components/ProductForm/ProductForm";
import {createProduct} from "../../store/actions/prodcutsActions";

const AddProduct = ({history}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  useMemo(() => {
    if (!user) {
      history.push('/login');
    }
  }, []);

  const onProductFormSubmit = async productData => {
    await dispatch(createProduct(productData));
    history.replace("/");
  };

  return (
    <>
      <Typography
        textAlign="center"
        marginBottom="20px"
        variant="h4"
      >
        Add new product
      </Typography>
      <ProductForm onSubmit={onProductFormSubmit}/>
    </>
  );
};

export default AddProduct;
import React, {useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import ProductForm from "../../components/ProductForm/ProductForm";
import {createProduct} from "../../store/actions/prodcutsActions";
import {fetchCategories} from "../../store/actions/categoiesActions";

const AddProduct = ({history}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const categories = useSelector(state => state.categories.categories);
  const error = useSelector(state => state.products.fetchError);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (!user) {
    return <Redirect to="/login"/>
  }

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
      <ProductForm
        onSubmit={onProductFormSubmit}
        categories={categories}
        error={error}
      />
    </>
  );
};

export default AddProduct;
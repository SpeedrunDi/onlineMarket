import React, {useState} from 'react';
import {Button, FormControl, FormHelperText, Grid, InputLabel, Select} from "@mui/material";
import FileInput from "../UI/Form/FileInput/FileInput";
import MenuItem from "@mui/material/MenuItem";
import FormElement from "../UI/Form/FormElement/FormElement";

const ProductForm = ({onSubmit, categories, error}) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(newProduct).forEach(key => {
      formData.append(key, newProduct[key]);
    });

    onSubmit(formData);
  };

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setNewProduct(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setNewProduct(prevState => ({...prevState, [name]: file}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid
        container
        maxWidth="md"
        textAlign="center"
        marginX="auto"
        direction="column"
        rowSpacing={2}
      >
        <Grid item>
          <FormControl required fullWidth error={getFieldError('category')}>
            <InputLabel id="select-category">Select category</InputLabel>
            <Select
              labelId="select-category"
              name="category"
              value={newProduct.category}
              label="Select category"
              onChange={inputChangeHandler}
            >
              {categories !== 0 && categories.map(category => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{getFieldError('category')}</FormHelperText>
          </FormControl>
        </Grid>
        <FormElement
          required={true}
          onChange={inputChangeHandler}
          name="title"
          label="Title"
          value={newProduct.title}
          error={getFieldError('title')}
        />

        <FormElement
          required={true}
          onChange={inputChangeHandler}
          type="number"
          name="price"
          label="Price"
          value={newProduct.price}
          error={getFieldError('price')}
        />

        <FormElement
          onChange={inputChangeHandler}
          name="description"
          label="Description"
          value={newProduct.description}
          error={getFieldError('description')}
        />

        <Grid item>
          <FileInput
            label="Image"
            name="image"
            onChange={fileChangeHandler}
          />
        </Grid>

        <Grid item>
          <Button type="submit" color="primary" variant="contained">Create</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
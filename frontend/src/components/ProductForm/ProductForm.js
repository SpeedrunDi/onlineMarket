import React, {useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import FileInput from "../UI/Form/FileInput/FileInput";

const ProductForm = ({onSubmit}) => {
  const [state, setState] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(state).forEach(key => {
      formData.append(key, state[key]);
    });

    onSubmit(formData);
  };

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setState(prevState => ({...prevState, [name]: file}));
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
          <TextField
            label="Title"
            name="title"
            value={state.title}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid item>
          <TextField
            type="number"
            label="Price"
            name="price"
            value={state.price}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid item>
          <TextField
            required
            multiline
            rows={3}
            label="Description"
            name="description"
            value={state.description}
            onChange={inputChangeHandler}
          />
        </Grid>

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
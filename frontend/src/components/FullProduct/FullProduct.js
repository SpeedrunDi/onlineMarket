import React from 'react';
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import imageNotAvailable from "../../assets/image-not-available.jpg";
import {apiUrl} from "../../config";

const FullProduct = ({product, user}) => {
  let image = imageNotAvailable;

  if (product.image) {
    image = apiUrl + '/' + product.image;
  }

  let btnDelete;
  if (user) {
    if (user._id === product.user._id) {
      btnDelete = (
        <Grid item paddingRight="20px">
          <Button variant="outlined" color="warning">
            Delete
          </Button>
        </Grid>
      );
    }
  }

  return (
    <Grid
      container
      maxWidth="520px"
      marginX="auto"
      justifyContent="end"
      border="2px solid black"
      borderRadius="15px"
      overflow="hidden"
      paddingBottom="20px"
    >
      <Grid item xs={12}>
        <img src={image} alt={product.title} style={{width: "516px", height: "auto"}}/>
      </Grid>
      <Grid item xs={12} paddingLeft="20px">
        <Typography variant="h5">
          <strong>Title: </strong>{product.title}
        </Typography>
      </Grid>
      <Grid item xs={12} paddingLeft="20px">
        <Typography>
          <strong>Price: </strong>{product.price} KGS
        </Typography>
      </Grid>
      <Grid item xs={12} paddingLeft="20px">
        <Typography>
          <strong>Category: </strong>{product.category.title}
        </Typography>
      </Grid>
      {product.description && (
        <Grid item xs={12} paddingLeft="20px">
          <Typography>
            <strong>Description: </strong>{product.description}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} paddingLeft="20px">
        <Typography>
          <strong>Name: </strong>{product.user.name}
        </Typography>
        <Typography>
          <strong>Phone: </strong>{product.user.phone}
        </Typography>
      </Grid>
      {btnDelete}
    </Grid>
  );
};

export default FullProduct;
import React from 'react';
import {Link} from "react-router-dom";
import {Button, Typography} from "@mui/material";

const Anonymous = () => {
  return (
    <>
      <Button component={Link} to="/register" color="inherit">
        Sign Up
      </Button>
      <Typography variant="span" paddingX="5px">or</Typography>
      <Button component={Link} to="/login" color="inherit">
        Sign In
      </Button>
    </>
  );
};

export default Anonymous;
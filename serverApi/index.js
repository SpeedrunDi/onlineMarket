const express = require('express');

const app = express();
const port = 8000;

const run = async () => {
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch(e => console.error(e));
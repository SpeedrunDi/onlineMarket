const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const Product = require("../models/Product");
const auth = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
  const query = {};

  if (req.query.category) {
    query.category = {$eq: req.query.category};
  }

  try {
    const products = await Product
      .find(query);

    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product
      .findById(req.params.id)
      .populate('user', 'name phone')
      .populate('category', 'title');

    if (!product) {
      res.status(404).send({message: 'Product not found!'});
    }

    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
  const {title, price, category, description} = req.body;

  if (!title || !price || !category) {
    return res.status(400).send({error: 'Data not valid'});
  }

  const productData = {
    title,
    price,
    category,
    user: req.user._id,
    description: description || null,
    image: null,
  };

  if (req.file) {
    productData.image = 'uploads/' + req.file.filename;
  }

  try {
    const product = new Product(productData);
    await product.save();

    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const products = await Product.findById({_id: req.params.id}, 'user');

    if (!products) {
      return res.status(404).send({message: "Product not found!"});
    }

    if (req.user._id.equals(products.user)) {
      await Product.deleteOne({_id: req.params.id});

      return res.send({message: 'Task deleted!'});
    }

    res.status(403).send({message: "You not have right!"});
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
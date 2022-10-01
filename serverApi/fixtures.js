const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const run = async () => {
  await mongoose.connect(config.mongo.db);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [Admin, Test] = await User.create({
    username: 'admin',
    password: 'admin',
    name: "Sam",
    phone: "+996 000 000 000",
    token: nanoid(),
  }, {
    username: 'test',
    password: 'test',
    name: "Jack",
    phone: "+996 000 000 000",
    token: nanoid(),
  });

  const [Category1, Category2, Category3, Category4] = await Category.create({
    title: 'Video cards',
    description: '',
  }, {
    title: 'CPUs',
    description: '',
  }, {
    title: 'Notebooks',
    description: '',
  }, {
    title: 'Chairs',
    description: '',
  });

  await Product.create({
    title: "Nvidia RTX 3080",
    price: 2000,
    category: Category2._id,
    user: Admin._id,
    image: 'fixtures/cpu.jpg',
  }, {
    title: "i3 11 500",
    price: 150000,
    category: Category1._id,
    user: Admin._id,
    image: 'fixtures/rtx3080.jpg',
  }, {
    title: "lenovo",
    description: "ryzen 5 5300u",
    price: 70000,
    category: Category3._id,
    user: Admin._id,
    image: 'fixtures/notebook.jpg',
  });

  await mongoose.connection.close();
};

run().catch(console.error);
require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProduct = require("./products.json");

(async () => {
  await connectDB(process.env.URL)
  console.log('Success')
  await Product.deleteMany();
  await Product.create(jsonProduct);
})();

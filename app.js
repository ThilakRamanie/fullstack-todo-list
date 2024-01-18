require("dotenv").config();
const notfoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const ConnectDB = require("./db/connect");
const productsRoute = require("./routes/products");
require("express-async-errors");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Product Route</a>');
});
app.use("/api/v1/products", productsRoute);
// products route
app.use(notfoundMiddleware);
app.use(errorMiddleware);

(async () => {
  try {
    await ConnectDB(process.env.URL);
    app.listen(PORT, () => console.log(`Server listens to ${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();

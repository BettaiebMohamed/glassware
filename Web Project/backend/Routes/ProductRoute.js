const express = require("express");
const productRoute = express.Router();
const isAuth = require("../Middleware/isAuth");
const isAutho = require("../Middleware/isAutho");

const {
  getProducts,
  getOneProduct,
  postProduct,
  putProduct,
  deleteProduct,
  addStock,
  removeStock
} = require("../Controllers/ProductController");

productRoute.get("/products", getProducts);

productRoute.get("/products/:id", getOneProduct);

productRoute.post("/products", isAuth, isAutho(['admin']), postProduct);

productRoute.put("/products/:id", isAuth, isAutho(['admin']), putProduct);

productRoute.delete("/products/:id", isAuth, isAutho(['admin']), deleteProduct);

productRoute.post("/products/:id/add-stock", isAuth, isAutho(['admin']), addStock);

productRoute.post("/products/:id/remove-stock", isAuth, isAutho(['admin']), removeStock);

module.exports = productRoute;

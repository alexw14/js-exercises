const express = require("express");
const productsDB = require("../db/products");
const productsIndexTemplate = require("../views/products/index");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productsDB.getAll();
  res.send(productsIndexTemplate({ products }));
});

module.exports = router;

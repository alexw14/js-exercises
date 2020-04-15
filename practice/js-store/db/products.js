const DB = require("./db");

class ProductsDB extends DB {}

module.exports = new ProductsDB("products.json");

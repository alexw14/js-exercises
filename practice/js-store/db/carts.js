const DB = require("./db");

class CartsDB extends DB {}

module.exports = new CartsDB("carts.json");

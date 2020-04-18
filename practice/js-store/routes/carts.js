const express = require("express");
const cartsDB = require("../db/carts");

const router = express.Router();

router.post("/cart/products", async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartsDB.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsDB.getOne(req.session.cartId);
  }
  console.log(cart);
  const existingItem = cart.items.find(item => {
    return item.id === req.body.productId;
  });
  console.log(existingItem)
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  await cartsDB.update(cart.id, { items: cart.items });

  res.send("Product Added To Cart");
});

router.get("/cart/products", (req, res) => {
  res.send("Added");
});

module.exports = router;

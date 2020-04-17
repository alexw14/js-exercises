const express = require("express");
const multer = require("multer");

const productsDB = require("../../db/products");
const productsNewTemplate = require("../../views/admin/products/new");
const { requireTitle, requirePrice } = require("./validators");
const { handleErrors } = require("./middlewares");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;
    await productsDB.create({ title, price, image });
    res.send("Added");
  }
);

module.exports = router;

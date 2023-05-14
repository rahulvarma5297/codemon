const express = require("express");
const mongoose = require("mongoose");
const Product = require("../schemas/product");

const router = express.Router();

router.get("/data", async (req, res) => {
  const products = await Product.find();

  if (products) {
    res.send(products);
  } else {
    res.status(404).send({ message: "Products not found" });
  }
});

router.get("/data/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res
      .status(404)
      .send({ message: `Product not found with ID ${req.params.id}` });
  }
});

router.post("/data", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  await product.save();
  res.status(201).send({ message: "New product created", data: product });
});

router.put("/data/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.price = req.body.price;

  if(!product && ! req.body.price) {
    res.status(403).send({ message: "Invalid Payload or Price Type" });
  }


  await product.save();
  if (product) {
    res.status(200).send({ message: "Product updated", data: product });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

module.exports = router;

const { Router } = require("express");
const {
  createProduct,
  getAllProducts,
} = require("../controllers/products.controller");

const router = Router();

router.post("/products", createProduct);

router.get("/products", getAllProducts);

module.exports = router;

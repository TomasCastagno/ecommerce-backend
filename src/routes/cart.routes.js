const { Router } = require("express");
const { addProductInCart } = require("../controllers/cart.controller");

const router = Router();

router.post("/cart", addProductInCart);

module.exports = router;

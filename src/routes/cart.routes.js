const { Router } = require("express");
const {
  addProductInCart,
  getProductsInCart,
} = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const router = Router();

// añadir producto a carrito
router.post("/cart", authMiddleware, addProductInCart);

// obtener todos los prodocutos de un carrito
router.get("/cart", authMiddleware, getProductsInCart);

module.exports = router;

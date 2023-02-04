const { Router } = require("express");
const {
  getPurchases,
  purchaseCart,
} = require("../controllers/purchases.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const router = Router();

// realizar la compra de productos que están en el carrito
// y pasarlas a la orden de pago
router.post("/cart/purchase", authMiddleware, purchaseCart);

// obtener todas las compras realizadas por un usuario
router.get("/purchases", authMiddleware, getPurchases);

module.exports = router;

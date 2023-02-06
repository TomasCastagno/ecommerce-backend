const { Router } = require("express");
const {
  getPurchases,
  purchaseCart,
} = require("../controllers/purchases.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const router = Router();

/**
 * @openapi
 * /api/v1/cart/purchase:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Purchase products that are in cart.
 *     description: Purchase products that are in a user's cart.
 *     tags: [Purchase orders]
 *     responses:
 *       200:
 *         description: The purchase has been successfully completed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The purchase has been successfully completed
 *       401:
 *         description: Something is wrong with the send mail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something is wrong with the send mail.
 *       400:
 *         description: Something went wrong in the purchase process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong in the purchase process.
 * /api/v1/purchases:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all purchase orders.
 *     description: Get all purchase orders from a user.
 *     tags: [Purchase orders]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   total_price:
 *                     type: number
 *                     format: float
 *                     example: 2500
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   products_in_order:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         quantity:
 *                           type: integer
 *                           example: 5
 *                         price:
 *                           type: number
 *                           format: float
 *                           example: 500
 *                         product:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               example: Televisor
 *       400:
 *         description: Something went wrong when trying to get purchase orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong when trying to get purchase orders.
 */

// realizar la compra de productos que están en el carrito
// y pasarlas a la orden de pago
router.post("/cart/purchase", authMiddleware, purchaseCart);

// obtener todas las compras realizadas por un usuario
router.get("/purchases", authMiddleware, getPurchases);

module.exports = router;

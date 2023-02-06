const { Router } = require("express");
const {
  addProductInCart,
  getProductsInCart,
} = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const router = Router();

/**
 * @openapi
 * /api/v1/cart:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add product to cart.
 *     description: Add product to user cart.
 *     tags: [Cart]
 *     requestBody:
 *       description: Required fields to add products to cart.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/addProductInCart'
 *     responses:
 *       201:
 *         description: Product has been successfully added to your cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product has been successfully added to your cart.
 *       400:
 *         description: Something wrong when trying to add product to cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something wrong when trying to add product to cart.
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all the products in the cart.
 *     description: Get all products in a user's cart.
 *     tags: [Cart]
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
 *                   quantity:
 *                     type: integer
 *                     example: 2
 *                   status:
 *                     type: boolean
 *                     example: false
 *                   product:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Celular A21
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 900
 *                   cart:
 *                     type: object
 *                     properties:
 *                       total_price:
 *                         type: number
 *                         format: float
 *                         example: 1800
 *                       user:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             example: "Tomas Castagno"
 *       400:
 *         description: Something went wrong when trying to get products in the cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong when trying to get products in the cart.
 */

// añadir producto a carrito
router.post("/cart", authMiddleware, addProductInCart);

// obtener todos los prodocutos de un carrito
router.get("/cart", authMiddleware, getProductsInCart);

module.exports = router;

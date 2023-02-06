const { Router } = require("express");
const {
  createProduct,
  getAllProducts,
} = require("../controllers/products.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const router = Router();

/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new product
 *     description: Create a new product into application
 *     tags: [Products]
 *     requestBody:
 *       description: Required fields to create a new product (name, price and stock).
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/addProduct'
 *     responses:
 *       201:
 *         description: Product has been successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     is_available:
 *                       type: boolean
 *                       example: true
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Iphone 12
 *                     description:
 *                       type: string
 *                       example: the elegant flat-edge design
 *                     image:
 *                       type: string
 *                       example: https://www.apple.com/newsroom/images/product/iphone/standard/apple_iphone-12-spring21_purple_04202021_big.jpg.large.jpg
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 900.00
 *                     stock:
 *                       type: integer
 *                       example: 15
 *                 seller:
 *                   type: string
 *                   example: Tomas
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all the products.
 *     description: Get all the products in the store.
 *     tags: [Products]
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
 *                   name:
 *                     type: string
 *                     example: Iphone 12
 *                   description:
 *                     type: string
 *                     example: The elegant flat-edge design
 *                   image:
 *                     type: string
 *                     example: https://www.apple.com/newsroom/images/product/iphone/standard/apple_iphone-12-spring21_purple_04202021_big.jpg.large.jpg
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 900.00
 *                   stock:
 *                     type: integer
 *                     example: 15
 *                   is_available:
 *                     type: boolean
 *                     example: true
 *                   seller:
 *                     type: string
 *                     example: Julia
 *       400:
 *         description: Something went wrong when trying to get products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong when trying to get products.
 */

// crear nuevo producto
router.post("/products", authMiddleware, createProduct);

// obtener todos los productos
router.get("/products", authMiddleware, getAllProducts);

module.exports = router;

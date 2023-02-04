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
 *                 message:
 *                   type: string
 *                   example: Product has been successfully added.
 *       400:
 *         description: Something wrong when trying to add product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something wrong when trying to add product
 */

// crear nuevo producto
router.post("/products", authMiddleware, createProduct);

// obtener todos los productos
router.get("/products", authMiddleware, getAllProducts);

module.exports = router;

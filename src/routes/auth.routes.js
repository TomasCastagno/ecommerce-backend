const { Router } = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user into application
 *     tags: [Auth]
 *     requestBody:
 *       description: Required fields to create a new user.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/register'
 *     responses:
 *       201:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully created.
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
 *         description: Invalid application.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid application.
 *
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     description: User login into application
 *     tags: [Auth]
 *     requestBody:
 *       description: Fields required to log in an existing user.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/login'
 *     responses:
 *       200:
 *         description: Successful login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successful login.
 *               data:
 *                 username:
 *                   type: string
 *                   example: Tomas
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: tomas@example.com
 *                 token:
 *                   type: string
 *                   example: $2b$10$f4Xv8rbMUcuqK8Xs432SruAM03Zcee.223b0mwdXDGP.t81afoh3.
 *         password:
 *           type: string
 *           example: 1234
 *       401:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials.
 *       400:
 *         description: Something is wrong with the login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something is wrong with the login.
 */

router.post("/register", register);

router.post("/login", login);

module.exports = router;

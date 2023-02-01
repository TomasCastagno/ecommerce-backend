// registro
//login

const { Router } = require("express");
const {
  register,
  login,
  getAllUsers,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const router = Router();

router.post("/register", register);
router.post("/login", login);

//ejemplo de rutra protegida con authMiddleware para obtener todos los usuarios
router.get("/users", authMiddleware, getAllUsers);

module.exports = router;

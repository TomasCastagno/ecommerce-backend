const CartService = require("../services/cart.service");

const addProductInCart = async (req, res) => {
  try {
    const product = req.body;
    const { id } = req.user;
    await CartService.add(product, id);
    res.status(201).json({ message: "successfully added" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getProductsInCart = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await CartService.getAll(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  addProductInCart,
  getProductsInCart,
};

const CartService = require("../services/cart.service");

const addProductInCart = async (req, res) => {
  try {
    const product = req.body;
    const result = await CartService.add(product);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  addProductInCart,
};

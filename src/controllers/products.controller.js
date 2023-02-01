const ProductService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const result = await ProductService.add(newProduct);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const result = await ProductService.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
};

const { cart: Cart } = require("../models");

class CartService {
  static async add(product) {
    try {
      const result = await Cart.create(product);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartService;

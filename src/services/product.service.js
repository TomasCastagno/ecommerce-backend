const { products: Products, users: Users } = require("../models");

class ProductService {
  static async add(newProduct) {
    try {
      const productAdded = await Products.create(newProduct);
      if (productAdded.user_id) {
        const { user_id } = newProduct;
        const seller = await Users.findOne({
          where: { id: user_id },
          attributes: ["username"],
        });
        const productWithDetails = await Products.findOne({
          where: { id: productAdded.id },
        });
        return {
          product: productWithDetails,
          seller: seller.username,
        };
      }
      return productAdded;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const products = await Products.findAll({
        include: {
          model: Users,
          as: "seller",
          attributes: ["username"],
        },
      });

      return products.map((product) => ({
        name: product.name,
        price: product.price,
        stock: product.stock,
        is_available: product.is_available,
        seller: product.seller.username,
      }));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductService;

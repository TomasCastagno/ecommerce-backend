const { Op } = require("sequelize");
const { Products, Users } = require("../models");

class ProductService {
  static async add(newProduct) {
    try {
      const product = await Products.create(newProduct);

      const seller = await Users.findOne({
        where: product.user_id,
        attributes: ["username"],
      });

      return {
        product,
        seller: seller.username,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const products = await Products.findAll({
        where: {
          stock: {
            [Op.gt]: 0,
          },
        },
        include: {
          model: Users,
          as: "seller",
          attributes: ["username"],
        },
      });

      return products.map((product) => ({
        id: product.id,
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

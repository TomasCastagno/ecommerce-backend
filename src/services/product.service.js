const { Op } = require("sequelize");
const { Products, Users } = require("../models");

class ProductService {
  static async add(newProduct) {
    try {
      const product = await Products.create(newProduct, {
        attributes: { exclude: ["user_id"] },
      });

      const seller = await Users.findOne({
        where: { id: product.user_id },
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

      return products;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductService;

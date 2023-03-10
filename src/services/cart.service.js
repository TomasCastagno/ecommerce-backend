const { Cart, Products, ProductsInCart, Users } = require("../models");

class CartService {
  static async add({ product_id, quantity }, id) {
    try {
      //* primero busca el producto y se fija si hay stock suficiente
      const product = await Products.findByPk(product_id);
      if (!product) {
        throw new Error(`Product with ID ${product_id} not found.`);
      }
      if (product.stock < quantity) {
        throw new Error(`There is not enough stock of the product.`);
      }

      // buscar si el producto ya existe en el carrito actualiza la cantidad
      //y si no existe crea un nuevo producto en la lista.

      let result;
      const productInCart = await ProductsInCart.findOne({
        where: { product_id },
      });
      if (productInCart) {
        result = await ProductsInCart.update(
          {
            quantity: productInCart.quantity + quantity,
          },
          {
            where: { product_id },
          }
        );
      } else {
        result = await ProductsInCart.create({
          cart_id: id,
          product_id,
          quantity,
        });
      }
      const total_price = product.price * quantity;

      // busco en el carrito perteneciente al usuario cuanto es el precio que tiene hasta el momento
      const cart = await Cart.findByPk(id);

      const { total_price: prevTotal } = cart;

      // sumo el total que tenía el carrito hasta ahora con el nuevo total de esta nueva carga de producto

      const newTotalPrice = prevTotal + total_price;

      await Cart.update(
        { total_price: newTotalPrice },
        {
          where: { id },
        }
      );

      return result;
    } catch (error) {
      throw new Error(`Error in CartService.add: ${error.message}`);
    }
  }

  static async getAll(id) {
    try {
      const productsInCart = await ProductsInCart.findAll({
        where: { cart_id: id },
        attributes: ["quantity", "status"],
        include: [
          {
            model: Products,
            as: "product",
            attributes: ["name", "price"],
          },
          {
            model: Cart,
            as: "cart",
            attributes: ["total_price"],
            include: {
              model: Users,
              as: "user",
              attributes: ["username"],
            },
          },
        ],
      });

      return productsInCart;
    } catch (error) {
      throw new Error(
        `Error in CartService.getById: ${error.message} ${console.log(id)}`
      );
    }
  }
}

module.exports = CartService;

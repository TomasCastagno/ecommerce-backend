const {
  ProductsInOrder,
  Order,
  ProductsInCart,
  Cart,
  Products,
} = require("../models");

class PurchaseService {
  static async purchase(id) {
    try {
      const productsInCart = await ProductsInCart.findAll({
        where: { cart_id: id },
        include: [
          {
            model: Products,
            as: "product",
          },
          {
            model: Cart,
            as: "cart",
            attributes: ["total_price"],
          },
        ],
      });

      // crea una nueva orden
      const order = await Order.create({
        total_price: productsInCart[0].cart.total_price,
        user_id: id,
        status: true,
      });

      //se recorre el arreglo para cargar cada uno de los productos
      // en el corrita a productos en la orden
      const productsInOrderPromises = productsInCart.map((product) =>
        ProductsInOrder.create({
          order_id: order.id,
          product_id: product.product_id,
          quantity: product.quantity,
          price: product.product.price,
          status: true,
        })
      );

      // Como se hizo una compra se recorre el arreglo para actualizar
      // el stock de cada uno de los productos que se compró
      const updatedProductsPromises = productsInCart.map((product) =>
        Products.update(
          { stock: product.product.stock - product.quantity },
          { where: { id: product.product.id } }
        )
      );

      // se espera la resolución de ambas promesas al mismo tiempo yaa que está conectada
      // la carga de productos en la orden con la actualización del stock
      const [productsInOrderResult, updatedProductsResult] = await Promise.all([
        Promise.all(productsInOrderPromises),
        Promise.all(updatedProductsPromises),
      ]);

      //si las dos promesas anteriores fueron resueltas correctamente,
      // retornarán un true, de esta manera se asegura que el carrito no
      // se vacie si la compra no fue efectivamente realizada.
      if (productsInOrderResult && updatedProductsResult) {
        await Cart.update(
          { total_price: 0 },
          { where: { user_id: id } },
          await ProductsInCart.destroy({ where: { cart_id: id } })
        );
      }

      return productsInOrderResult && updatedProductsResult;
    } catch (error) {
      throw new Error(
        `The purchase cannot be made if the cart is empty. ${error.message}`
      );
    }
  }

  static async getAll(id) {
    try {
      const result = await Order.findAll({
        where: { user_id: id },
        attributes: { exclude: ["user_id"] },
        include: {
          model: ProductsInOrder,
          as: "products_in_orders",
          attributes: ["quantity", "price"],
          include: {
            model: Products,
            as: "product",
            attributes: ["name"],
          },
        },
      });
      return result;
    } catch (error) {
      throw new Error(
        `No purchase order found for this user or ${error.message}.`
      );
    }
  }
}

module.exports = PurchaseService;

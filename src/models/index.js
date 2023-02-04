const db = require("../utils/database");
const initModels = require("./init-models");

const models = initModels(db);

const { cart, order, products, products_in_cart, products_in_order, users } =
  models;

module.exports = {
  Cart: cart,
  Order: order,
  Products: products,
  ProductsInCart: products_in_cart,
  ProductsInOrder: products_in_order,
  Users: users,
};

const DataTypes = require("sequelize").DataTypes;
const _cart = require("./cart");
const _order = require("./order");
const _products = require("./products");
const _products_in_cart = require("./products_in_cart");
const _products_in_order = require("./products_in_order");
const _users = require("./users");

function initModels(sequelize) {
  const users = _users(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const cart = _cart(sequelize, DataTypes);
  const order = _order(sequelize, DataTypes);
  const products_in_cart = _products_in_cart(sequelize, DataTypes);
  const products_in_order = _products_in_order(sequelize, DataTypes);

  products_in_cart.belongsTo(cart, { as: "cart", foreignKey: "cart_id" });
  cart.hasMany(products_in_cart, {
    as: "products_in_carts",
    foreignKey: "cart_id",
  });
  products_in_order.belongsTo(order, { as: "order", foreignKey: "order_id" });
  order.hasMany(products_in_order, {
    as: "products_in_orders",
    foreignKey: "order_id",
  });
  products_in_cart.belongsTo(products, {
    as: "product",
    foreignKey: "product_id",
  });
  products.hasOne(products_in_cart, {
    as: "products_in_cart",
    foreignKey: "product_id",
  });
  products_in_order.belongsTo(products, {
    as: "product",
    foreignKey: "product_id",
  });
  products.hasOne(products_in_order, {
    as: "products_in_order",
    foreignKey: "product_id",
  });
  cart.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasOne(cart, { as: "cart", foreignKey: "user_id" });
  order.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(order, { as: "orders", foreignKey: "user_id" });
  products.belongsTo(users, { as: "seller", foreignKey: "user_id" });
  users.hasMany(products, { as: "products", foreignKey: "user_id" });

  return {
    cart,
    order,
    products,
    products_in_cart,
    products_in_order,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

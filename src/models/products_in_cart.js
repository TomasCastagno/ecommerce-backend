const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return products_in_cart.init(sequelize, DataTypes);
}

class products_in_cart extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cart',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      },
      unique: "products_in_cart_product_id_key"
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'products_in_cart',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_in_cart_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "products_in_cart_product_id_key",
        unique: true,
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}

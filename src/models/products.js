const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return products.init(sequelize, DataTypes);
};

/**
 * @openapi
 * components:
 *   schema:
 *     addProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Iphone 12
 *         description:
 *           type: string
 *           example: the elegant flat-edge design
 *         image:
 *           type: string
 *           example: https://www.apple.com/newsroom/images/product/iphone/standard/apple_iphone-12-spring21_purple_04202021_big.jpg.large.jpg
 *         price:
 *           type: number
 *           format: float
 *           example: 900.00
 *         stock:
 *           type: integer
 *           example: 15
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

class products extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: "products_name_key",
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        is_available: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "products",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "products_name_key",
            unique: true,
            fields: [{ name: "name" }],
          },
          {
            name: "products_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}

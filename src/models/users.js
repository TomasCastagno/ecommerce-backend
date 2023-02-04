const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  return users.init(sequelize, DataTypes);
};

/**
 * @openapi
 * components:
 *   schema:
 *     register:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: Tomas
 *         email:
 *           type: string
 *           example: tomas@example.com
 *         password:
 *           type: string
 *           example: 1234
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: tomas@example.com
 *         password:
 *           type: string
 *           example: 1234
 */

class users extends Sequelize.Model {
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
        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: "users_email_key",
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "users",
        schema: "public",
        timestamps: false,
        hooks: {
          beforeCreate: (newUser, options) => {
            const { password } = newUser;
            const hash = bcrypt.hashSync(password, 10);
            newUser.password = hash;
          },
        },
        indexes: [
          {
            name: "users_email_key",
            unique: true,
            fields: [{ name: "email" }],
          },
          {
            name: "users_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}

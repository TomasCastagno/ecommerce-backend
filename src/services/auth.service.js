const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users, Cart } = require("../models");
require("dotenv").config();

class AuthServices {
  static async register(newUser) {
    try {
      const result = await Users.create(newUser);
      const { id } = result;
      await Cart.create({
        user_id: id,
        total_price: 0,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async login(credentials) {
    try {
      const { email, password } = credentials;
      const user = await Users.findOne({ where: { email } });
      if (user) {
        const isValid = bcrypt.compareSync(password, user.password);
        return isValid ? { isValid, user } : { isValid };
      }
      return { isValid: false };
    } catch (error) {
      throw error;
    }
  }

  static genToken(data) {
    try {
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        // expiresIn: "10m",
        algorithm: "HS512",
      });
      return token;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = AuthServices;

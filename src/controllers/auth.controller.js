const AuthServices = require("../services/auth.service");
const registerMail = require("../templates/register.mail");
const transporter = require("../utils/mailer");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const newUser = req.body;
    const result = await AuthServices.register(newUser);
    if (result) {
      await transporter.sendMail({
        to: newUser.email,
        from: process.env.MAIL,
        subject: `Welcome ${newUser.username}`,
        html: registerMail,
      });
      res.status(201).json({ message: "User successfully created" });
    } else {
      res
        .status(401)
        .json({ message: "Something is wrong with the send mail." });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({
        error: "Missing data",
        message: "Not email or password provided",
      });
    } else {
      const result = await AuthServices.login({ email, password });
      if (result.isValid) {
        const { username, id, email } = result.user;
        const userData = { username, id, email };
        const token = AuthServices.genToken(userData);
        userData.token = token;
        res.json(userData);
      } else {
        res.status(401).json("invalid credentials");
      }
    }
  } catch (error) {
    res.status(400).json({
      message: `Something is wrong with the login controller. ${error.message}`,
    });
  }
};

module.exports = {
  register,
  login,
};

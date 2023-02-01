const AuthServices = require("../services/auth.service");
const transporter = require("../utils/mailer");

const register = async (req, res) => {
  try {
    const newUser = req.body;
    const result = await AuthServices.register(newUser);
    if (result) {
      res.status(201).json({ message: "user created" });
      //   await transporter.sendMail({
      //     to: result.email,
      //     from: "tomascastagno@live.com.ar",
      //     subject: "Email confirmation nodemailer",
      //     html: "<h1>Bienvenido a la mejor app de chat creada por mi</h1> <p> Tienes que confirmar tu email</p> <p> Solo haz click en el siguiente <a href='#' target='new_blank'> enlace </a>",
      //   });
    } else {
      res.status(400).json({ message: "something wrong" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
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
    res.status(400).json({ message: "Something wrong" });
  }
};

//ejemplo para obtener todos los usuarios (ruta protegida)
const getAllUsers = async (req, res) => {
  try {
    const result = await AuthServices.getAll();
    res.json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
};

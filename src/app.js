const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./utils/database");
const apiRoutes = require("./routes");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

db.authenticate()
  .then(() => console.log("Autenticación exitosa"))
  .catch((error) => console.log(error));

db.sync({ force: false })
  .then(() => console.log("Base de datos sincronizada."))
  .catch((error) => console.log(error));

apiRoutes(app);

module.exports = app;

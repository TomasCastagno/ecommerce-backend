const swaggerDocs = require("../swagger");
const app = require("./app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  swaggerDocs(app, PORT);
});

const authRoutes = require("./auth.routes");
const productsRoutes = require("./products.routes");
const cartRoutes = require("./cart.routes");
const purchasesRoutes = require("./purchases.routes");

const apiRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1", productsRoutes);
  app.use("/api/v1", cartRoutes);
  app.use("/api/v1", purchasesRoutes);
};

module.exports = apiRoutes;

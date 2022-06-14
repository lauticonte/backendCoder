const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
require("./src/mongodb/mongooseLoader");
const PORT = process.env.PORT || 8080;
const logger = require("./src/utils/logger");

const session = require("express-session");
const passport = require("passport");
const passportStrategy = require("./src/utils/passport");
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');

const clusterMode = false;
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const errorHandler = require("./src/middlewares/errorHandler");
const notFound = require("./src/middlewares/notFound");

const apiProductos = require("./src/routes/productos");
const apiCarritos = require("./src/routes/carritos");
const login = require("./src/routes/login");
const logout = require("./src/routes/logout");
const register = require("./src/routes/register");

if (cluster.isMaster && clusterMode) {
  logger.info(`PID MASTER ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', worker => {
    logger.info("Worker", worker.process.pid, "died", new Date().toLocaleString());
    cluster.fork();
  })
}
else {

  app.use(
    session({
      secret: "AqWzsxEDCvFvbNPaNBdsWQl",
      resave: true,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        ttl: 600000,
        autoRemove: "native",
      }),
      cookie: {
        secure: false,
        maxAge: 600000
      }
    })
  );

  app.use(express.static("./public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use("/api/productos", apiProductos);
  app.use("/api/carrito", apiCarritos);
  app.use("/api", login);
  app.use("/api", register);
  app.use("/api", logout);

  app.use(errorHandler);
  app.use(notFound);

  const server = app.listen(PORT, () => {
    logger.info(`(Pid: ${process.pid}) Servidor Express escuchando peticiones en el puerto ${server.address().port}`);
  });
  server.on("error", (error) => logger.error(`Error en servidor ${error}`));
}
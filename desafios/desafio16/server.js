const {MONGOURL, PORT} = require("./src/config");
require("./src/mongodb/mongooseLoader");
// const {fork} = require('child_process');
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const passportStrategy = require("./src/utils/passport");
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const { engine } = require("express-handlebars");
const { Socket } = require("socket.io");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const compression = require('compression');
const logger = require('./src/utils/logger.js');

const errorHandler = require("./src/middlewares/errorHandler");
const notFound = require("./src/middlewares/notFound");

const allRoute = require("./src/route/all");
const infoRoute = require("./src/route/info");
const loginRoute = require("./src/route/login")
const productRoutes = require("./src/route/productos");
const registerRoute = require("./src/route/register");
const renderRoute = require("./src/route/render");

const { normalizar, print, denormalizar } = require("./src/utils/normalizar");
const ApiProductosMock = require("./src/api/productos");
const apiProductos = new ApiProductosMock();
const Chat = require("./src/daos/chat");
let chat = new Chat("./src/daos/chat.txt");


if (cluster.isMaster && PORT.m == 'CLUSTER') {
  logger.info(`PID MASTER ${process.pid}`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', worker => {
    logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
    cluster.fork()
  })
}
else {
  app.engine(
    "hbs",
    engine({
      defaultLayout: "index",
      extname: ".hbs",
    })
  );
  app.set("view engine", "hbs");
  app.set("views", "./views");

  app.use(express.static("./public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(
    session({
      secret: "AlckejcUi5Jnm3rFhNjUil87",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: MONGOURL,
        ttl: 600000,
        autoRemove: "native",
      }),
    })
  );
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  io.on("connection", async (socket) => {
    logger.info("Un cliente se ha conectado");
    const arrayDeProductos = await apiProductos.getAll();
    const messages = await chat.getMessages().then((res) => res);
    const normalizedMessages = normalizar(messages);
    const denormalizedMessages = denormalizar(normalizedMessages);
    socket.emit("productos", arrayDeProductos);
    socket.emit("messages", normalizedMessages);
    socket.on("new-product", async (data) => {
      await apiProductos.save(data);
      const arrayDeProductos = await apiProductos.getAll();
      io.sockets.emit("productos", arrayDeProductos);
    });
    socket.on("new-message", async (data) => {
      await chat.saveMessages(data).then((resolve) => resolve);
      const messages = await chat.getMessages().then((resolve) => resolve);
      const normalizedMessages = normalizar(messages);
      io.sockets.emit("messages", normalizedMessages);
    });
  });

  app.use("/*", allRoute);
  app.use("/", infoRoute);
  app.use("/api", loginRoute);
  app.use("/api", productRoutes);
  app.use("/api", registerRoute);
  app.use("/api", renderRoute);


  /* desactivo el child process para el análisis de performance
  app.get("/random/:cant?", (req, res) => {
    const forked = fork('./utils/generateRandom.js');
    let cant = +req.params.cant || 100000000;
    forked.send(cant);
    forked.on('message', (numeros) => {
      res.send(numeros.res);
    })
  })
  */

const srv = server.listen(PORT.p, () => {
  logger.info(
    `(Pid: ${process.pid}) Servidor Express escuchando peticiones en el puerto ${srv.address().port}`
  );
});
srv.on("error", (error) => logger.error(`Error en servidor ${error}`));
}
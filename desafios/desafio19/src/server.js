const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const {MONGOURL, PORT} = require("./config/config");
require("./mongodb/mongooseLoader");
// const {fork} = require('child_process');
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const passportStrategy = require("./utils/passport");
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
const logger = require('./utils/logger.js');

var path = require ('path');

const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const allRoute = require("./route/all");
const infoRoute = require("./route/info");
const loginRoute = require("./route/login")
const productRoutes = require("./route/productos");
const registerRoute = require("./route/register");
const renderRoute = require("./route/render");

const { normalizar, print, denormalizar } = require("./utils/normalizar");
const productService = require('./services/productService');
const Chat = require("./daos/chat");
let chat = new Chat("./daos/chat.txt");


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
  app.set('views', __dirname + '/views');

  function getAllProducts() {
    const products = productService.getAll();
    return products;
  }
  function getProductById(id) {
    const product = productService.getById(id);
    return product;
  }
  function saveProduct(product) {
    const saveProduct = productService.save(product.data);
    return saveProduct;
  }
  function deleteProductById(id) {
    const productDeleted = productService.deleteById(id);
    return productDeleted;
  }
  function deleteAll() {
    const productsDeleted = productService.deleteAll();
    return productsDeleted;
  }
  const schema = buildSchema(`
    type Products {
      id: ID!,
      title: String,
      price: Int,
      thumbnail: String
    }
    input ProductsInput {
      title: String,
      price: Int,
      thumbnail: String
    }
    type Query {
      getAllProducts: [Products],
      getProductById(id: ID!): Products,
    }
    type Mutation {
      saveProduct(data: ProductsInput): Products,
      deleteProd(id: ID!): Products,
      deleteAll:Products,
    }
  `);

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: {
      getAllProducts,
      getProductById,
      saveProduct,
      deleteProductById,
      deleteAll,
    },
    graphiql: true,
  }));

  app.use(express.static(path.join(__dirname + './public')));
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
    const arrayDeProductos = await productService.getAll();
    const messages = await chat.getMessages().then((res) => res);
    const normalizedMessages = normalizar(messages);
    const denormalizedMessages = denormalizar(normalizedMessages);
    socket.emit("productos", arrayDeProductos);
    socket.emit("messages", normalizedMessages);
    socket.on("new-product", async (data) => {
      await productService.save(data);
      const arrayDeProductos = await productService.getAll();
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
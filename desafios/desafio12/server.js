require("./mongodb/mongooseLoader");
const User = require('./models/user');
const bCrypt = require ('bcrypt');
const { normalizar, print, denormalizar } = require("./utils/normalizar");
const ApiProductosMock = require("./api/productos");
const apiProductos = new ApiProductosMock();
const Chat = require("./contenedores/chat");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");
const { Socket } = require("socket.io");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { Router } = express;
const apiRouter = Router();

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
app.use("/api", apiRouter);
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));
apiRouter.use(
  session({
    secret: "AlckejcUi5Jnm3rFhNjUil87",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://Lautaro:1234@codercluster18335.zy1j9.mongodb.net/ecommerce?retryWrites=true&w=majority",
      ttl: 600000,
      autoRemove: "native",
    }),
  })
);
const flash = require('connect-flash');
apiRouter.use(flash());

function isValidPassword(user, password) {
  console.log (user, password)
  return bCrypt.compareSync(password, user.password);
}
function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.use(
  "login",
  new LocalStrategy( {passReqToCallback : true}, (req, username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        console.log("User Not Found with email " + username);
        return done(null, false, req.flash('message', 'Usuario no encontrado.'));
      }
      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false, req.flash('message', 'Contraseña incorrecta'));
      }
      return done(null, user);
    });
  })
);

passport.use('signup', new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {
  User.findOne({ 'username' : username }, (err, user) => {
    if (err){
      console.log('Error in SignUp: '+err);
      return done(err);
    }
    if (user) {
      console.log('User already exists with username: ' + username);
      return done(null, false, req.flash('message','El usuario ya se encuentra registrado'));
    } else {
      const newUser = new User();
      newUser.username = username;
      newUser.password = createHash(password);
      newUser.save((err) => {
        if (err){
          console.log('Error in Saving user: '+err);  
          throw err;  
        }
        console.log('User Registration succesful');    
        return done(null, newUser);
      });
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

apiRouter.use(passport.initialize());
apiRouter.use(passport.session());

let chat = new Chat("./contenedores/chat.txt");

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");

  const arrayDeProductos = await apiProductos.getAll();
  const messages = await chat.getMessages().then((res) => res);
  const normalizedMessages = normalizar(messages);
  const denormalizedMessages = denormalizar(normalizedMessages);

  socket.emit("productos", arrayDeProductos);
  socket.emit("messages", normalizedMessages);

  socket.on("new-product", async (data) => {
    await productos.save(data).then((resolve) => resolve);
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

apiRouter.get("/", async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("form-new-product", { user: req.user.username });
  }
  else {
    res.render("form-new-product");
  }
});

apiRouter.get("/productos-test", async (req, res, next) => {
  try {
    const arrayDeProductos = await apiProductos.getAll();
    if (arrayDeProductos.length === 0) {
      throw new Error("No hay productos");
    }
    res.render("datos", { arrayDeProductos });
  } catch (err) {
    next(err);
  }
});

apiRouter.get("/productos/:id", async (req, res, next) => {
  try {
    const producto = await productos
      .getById(Number(req.params.id))
      .then((resolve) => resolve);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    res.json(producto);
  } catch (err) {
    next(err);
  }
});

apiRouter.get("/logout", async (req, res, next) => {
  if (req.session.user) {
    const session = req.session.user;
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.json(`Hasta luego ${session}`);
      }
    });
    setTimeout(() => {
      res.redirect("/api");
    }, 2000);
  }
});

apiRouter.get('/signin', (req, res) => {
  res.render("signin");
})
apiRouter.get('/signup', (req, res) => {
  res.render("signup");
})
apiRouter.get("/logoff", (req, res) => {
  req.logOut();
  res.redirect('/api');
})
apiRouter.get('/errorlogin', (req, res) => {
  res.render('errorlogin', {message: req.flash('message')})
})
apiRouter.get('/errorsignup', (req, res) => {
  res.render('errorsignup', {message: req.flash('message')})
})

apiRouter.post("/login", async (req, res, next) => {
  try {
    if (!req.body.userName) {
      throw new Error("Debe enviar un nombre de usuario");
    }
    req.session.user = req.body.userName;
    req.session.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.json(`Login correcto ${req.session.user}`);
      }
    });
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/signin', passport.authenticate('login', { failureRedirect: '/api/errorlogin'}), (req, res) => {
  req.session.username = req.body.username;
  res.redirect('/api')
});
apiRouter.post('/signup', passport.authenticate('signup', { successRedirect: '/api', failureRedirect: '/api/errorsignup'}));

apiRouter.post("/productos", async (req, res, next) => {
  try {
    res.json(await apiProductos.popular(req.query.cant));
  } catch (err) {
    next(err);
  }
});

apiRouter.put("/productos/:id", async (req, res, next) => {
  try {
    const producto = await productos
      .getById(Number(req.params.id))
      .then((res) => res);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    await productos
      .update(
        Number(req.params.id),
        req.body.title,
        req.body.price,
        req.body.thumbnail
      )
      .then((resolve) => {
        res.json(resolve);
      });
  } catch (err) {
    next(err);
  }
});
apiRouter.delete("/productos/:id", async (req, res, next) => {
  try {
    const producto = await productos
      .getById(Number(req.params.id))
      .then((resolve) => resolve);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    await productos.deleteById(Number(req.params.id)).then((resolve) => {
      res.json(`${producto.title} se borro con éxito`);
    });
  } catch (err) {
    next(err);
  }
});

function handleErrors(err, req, res, next) {
  console.log(err.message);
  res.render("datos", { err });
}
apiRouter.use(handleErrors);

const PORT = process.env.PORT || 8080;
const srv = server.listen(PORT, () => {
  console.log(
    `Servidor Express escuchando peticiones en el puerto ${srv.address().port}`
  );
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));

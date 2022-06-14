const nodemailer = require("nodemailer");
const transporter = require("./mail");
const logger = require("./logger");
const User = require("../models/user");
const bCrypt = require ("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");


passport.use(
  "login",
  new LocalStrategy( {passReqToCallback : true}, (req, username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        logger.error(err);
        return done(err);
      }
      if (!user) {
        logger.warn("User Not Found with email " + username);
        return done(null, false, req.flash('message', 'Usuario no encontrado.'));
      }
      if (!isValidPassword(user, password)) {
        logger.warn("Invalid Password");
        return done(null, false, req.flash('message', 'Contraseña incorrecta'));
      }
      return done(null, user);
    });
  })
);

passport.use('signup', new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {
  User.findOne({ 'username' : username }, (err, user) => {
    if (err){
      logger.error("Error in SignUp: "+err);
      return done(err);
    }
    if (user) {
      logger.warn("User already exists with username: " + username);
      return done(null, false, req.flash('message','El usuario ya se encuentra registrado'));
    } else {
      const newUser = new User();
      newUser.username = username;
      newUser.password = createHash(password);
      newUser.name = req.body.name;
      newUser.address = req.body.address;
      newUser.age = req.body.age;
      newUser.phone = req.body.phone;
      newUser.save((err) => {
        if (err){
          logger.error('Error in Saving user: '+err);  
          throw err;  
        }
        let mailOptions = {
          from: "Preentrega 3 Lautaro Conte",
          to: "jerome.mitchell81@ethereal.email",
          subject: "Nuevo registro",
          text: `Datos de registro:
          Email: ${newUser.username}
          Contraseña: ${password},
          Nombre: ${newUser.name},
          Dirección: ${newUser.address},
          Edad: ${newUser.age},
          Teléfono: ${newUser.phone}`
        };
        let info = transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            logger.error("Error al enviar mail: " + err);
          } else {
            logger.info("Message sent: %s", info.messageId);
            logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          }
        });

        logger.info('User Registration succesful');    
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

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}
function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

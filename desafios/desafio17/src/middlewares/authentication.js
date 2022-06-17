const admin = true;

const isAdmin = (req, res, next) => {
  if (!admin) {
    logger.warn(`Ruta ${req.originalUrl} método ${req.method} no autorizados`);
    return res.status(403).json({error: 403, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
  } else {
    return next();
  }
}

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login.html');
  }
}

module.exports = { isAdmin, isAuth };
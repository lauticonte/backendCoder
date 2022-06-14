const logger = require('../utils/logger');
const notFound = (req, res, next) => {
  logger.warn(`Ruta ${req.url} método ${req.method} no implementados`);
  return res.status(404).json({error: 404, descripcion: `Ruta ${req.url} método ${req.method} no implementados`});
}

module.exports = notFound;
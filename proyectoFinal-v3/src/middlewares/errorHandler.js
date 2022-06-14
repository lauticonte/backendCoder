const logger = require('../utils/logger');
const errorHandler = (error, req, res, next) => {
  logger.warn(error);
  return res.status(400).json({"error": 400, "descripcion": error.message});
}

module.exports = errorHandler;
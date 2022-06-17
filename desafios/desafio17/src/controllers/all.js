const logger = require('../utils/logger');

const all = (req, res, next) => {
  logger.info(`${req.method} a ${req.path}`);
  next();
};

module.exports = all;
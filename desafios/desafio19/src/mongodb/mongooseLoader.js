const logger = require('../utils/logger');
const {MONGOURL} = require("../config/config");
const mongoose = require("mongoose");

const connection = mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  logger.info('[Mongoose] - connected in:', MONGOURL);
});

mongoose.connection.on('error', (err) => {
  logger.error('[Mongoose] - error:', err);
});

module.exports = connection;
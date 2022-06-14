const logger = require('../utils/logger');
const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  logger.info('[Mongoose] - connected in:', process.env.MONGODB_URL);
});

mongoose.connection.on('error', (err) => {
  logger.error('[Mongoose] - error:', err);
});

module.exports = connection;
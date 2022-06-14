const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://Lautaro:1234@codercluster18335.zy1j9.mongodb.net/ecommerce?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('[Mongoose] - connected in:', process.env.MONGODB_URL);
});

mongoose.connection.on('error', (err) => {
  console.log('[Mongoose] - error:', err);
});

module.exports = connection;
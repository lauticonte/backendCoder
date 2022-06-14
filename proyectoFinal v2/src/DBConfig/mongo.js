// module of connection to the database.
const mongoose = require("mongoose");
const config = require("../config/config.json");

const Mongoconfig = require("../config/Mongoconfig.json");
const url = Mongoconfig[config.typeMongo];

const connection = mongoose.connect(url, { useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("[Mongoose] - connected in:", url);
});

mongoose.connection.on("error", err => {
  console.log("[Mongoose] - error:", err);
});

module.exports = connection;

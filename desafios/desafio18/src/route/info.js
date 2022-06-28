const express = require("express");
const compression = require('compression');
const info = require("../controllers/info");
const { Router } = express;
const infoRouter = Router();

infoRouter.get("/info", compression(), info);

module.exports = infoRouter;
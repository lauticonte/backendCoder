const express = require("express");
const all = require("../controllers/all");
const { Router } = express;
const allRouter = Router();
allRouter.all("/*", all);

module.exports = allRouter;
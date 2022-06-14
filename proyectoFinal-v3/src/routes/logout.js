const express = require("express");
const passport = require("passport");
const { Router } = express;
const logout = Router();
logout.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
})
module.exports = logout;
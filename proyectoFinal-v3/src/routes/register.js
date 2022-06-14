const express = require("express");
const passport = require("passport");
const { Router } = express;
const register = Router();

register.post("/register", passport.authenticate("signup", { successRedirect: "/", failureRedirect: "/api/errorsignup"}))
.get("/errorsignup", (req, res) => {
  res.json({message: req.flash('message')});
});

module.exports = register;
const express = require("express");
const passport = require("passport");

const { Router } = express;
const register = Router();

register.post("/register", passport.authenticate('signup', { successRedirect: '/api', failureRedirect: '/api/errorsignup'}));

module.exports = register;
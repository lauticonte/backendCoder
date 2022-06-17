const express = require("express");
const passport = require("passport");
const loginController = require("../controllers/login");
const { Router } = express;
const login = Router();
login.post("/login", passport.authenticate('login', { failureRedirect: '/api/errorlogin'}), loginController);
module.exports = login;
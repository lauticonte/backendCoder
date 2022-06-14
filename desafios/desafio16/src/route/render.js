const express = require("express");
const renderControllers = require("../controllers/render");
const { Router } = express;
const render = Router();
render.get("/", renderControllers.formRender)
.get("/signin", renderControllers.loginRender)
.get("/signup", renderControllers.signupRender)
.get("/logout", renderControllers.logoutRender)
.get("/errorlogin", renderControllers.errorLogin)
.get("/errorsignup", renderControllers.errorSignup)
module.exports = render;
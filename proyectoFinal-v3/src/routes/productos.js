const express = require("express");
const productsControllers = require("../controllers/productos");
const { isAdmin, isAuth } = require("../middlewares/authentication");
const { Router } = express;
const apiProductos = Router();

apiProductos.get("/:id?", productsControllers.getProductos)
.post("/", isAdmin, productsControllers.postProductos)
.put("/:id", isAdmin, productsControllers.putProductos)
.delete("/:id", isAdmin, productsControllers.deleteProductos);

module.exports = apiProductos;

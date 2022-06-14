const express = require("express");
const cartsControllers = require("../controllers/carritos");
const { isAdmin, isAuth } = require("../middlewares/authentication");
const { Router } = express;
const apiCarritos = Router();

apiCarritos.get("/:id/productos", cartsControllers.getProductsFromCart)
.get("/:id/procesar", isAuth, cartsControllers.procesar)
.post("/", isAuth, cartsControllers.postCart)
.post('/:id/productos', cartsControllers.addProductToCart)
.delete("/:id/productos/:id_prod", cartsControllers.deleteProductFromCart)
.delete("/:id", cartsControllers.deleteCart);

module.exports = apiCarritos;

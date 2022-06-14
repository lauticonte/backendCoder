const express = require('express');
const cartManager = require("../managers/Carts");
const { Router } = express;
const apiCart = Router();

apiCart.get("/:id/productos", cartManager.getProductsFromCart)
.post("/", cartManager.postCart)
.post("/:id/productos", cartManager.addProductToCart)
.delete("/:id/productos/:id_prod", cartManager.deleteProductFromCart)
.delete("/:id", cartManager.deleteCart);

module.exports = apiCart;
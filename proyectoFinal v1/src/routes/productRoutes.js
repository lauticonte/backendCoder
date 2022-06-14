//=========== MODULOS ===========//
const express = require('express');
const { Router } = express;
const apiProducts = Router();
const productManager = require('../managers/Products');
const middlewares = require('../managers/Middlewares');

//=========== ROUTES ===========//
apiProducts.get("/:id?", productManager.getProducts)
.post("/", middlewares.isAdmin, productManager.postProducts)
.put("/:id", middlewares.isAdmin, productManager.putProducts)
.delete("/:id", middlewares.isAdmin, productManager.deleteProducts);

module.exports = apiProducts;
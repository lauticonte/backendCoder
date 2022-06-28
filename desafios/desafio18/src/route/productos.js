const express = require("express");
const productsControllers = require("../controllers/productos");
const { Router } = express;
const productosRouter = Router();

productosRouter.get("/productos-test", productsControllers.getProductosTest)
.get("/productos/:id", productsControllers.getProductById)
.post("/productos", productsControllers.postProducto)
.put("/productos/:id", productsControllers.updateProduct)
.delete("/productos/:id", productsControllers.deleteProduct);

module.exports = productosRouter;
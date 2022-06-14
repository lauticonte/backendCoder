const express = require("express");
const router = express.Router();

// CONTROLLER
const CarritoController = require("../api/carrito");
// const ProductosController = require("../api/productos");

// router.post('/', (req,res) => {
//   CarritoController.createCart()
//   .then(result => res.send(result))
//   console.log()
// })

router.post("/", async (req,res) => {
  const id = await CarritoController.guardar();
  res.json({ id });
})

router.get("/listar", async (req, res) => {
  const carrito = await CarritoController.listar();
  res.json(carrito);
});

router.get("/listar/:id?", async (req, res) => {
  const { id } = req.params;
  const carrito = await CarritoController.listarId(id);
  carrito ? res.json(carrito) : res.status(404).json(`No se encontró el carrito con id ${id}`);
});

router.post("/agregar/:id_producto", async (req, res) => {
  const { id_producto } = req.params;
  const producto = await CarritoController.guardar(id_producto);
  producto
    ? res.json(producto)
    : res.status(404).json(`No se encontró el producto con id ${id_producto}`);
});

router.delete("/borrar/:id", async (req, res) => {
  const { id } = req.params;
  const carrito = await CarritoController.borrar(id);
  carrito ? res.json(carrito) : res.status(404).send(`No se encontró el carrito con id ${id}`);
});

module.exports = router;

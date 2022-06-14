// const { query } = require("express");
const express = require("express");
const router = express.Router();

// CONTROLLER
const ProductosController = require("../api/productos");

// MIDDLEWARE ADMINISTRADOR
// paso parámetro administrador por query.params: administrador=true habilita la ruta
function administrador(req, res, next) {
  if (!req.query.administrador) {
    res.status(401).send({
      error: -1,
      descripción: `ruta ${req.originalUrl} (metodo ${req.method}) solo autorizada para administradores`
    });
  } else {
    next();
  }
}

// RUTAS
router.get("/listar", async (req, res) => {
  const productos = await ProductosController.listar();
  res.json(productos);
});

router.get("/listar/:id?", async (req, res) => {
  const { id } = req.params;
  const producto = await ProductosController.listarId(id);
  producto ? res.json(producto) : res.status(404).json(`No se encontró el producto con id ${id}`);
});

router.post("/guardar", administrador, async (req, res) => {
  const { body } = req;
  const producto = await ProductosController.guardar(body);
  producto ? res.json(producto) : res.status(404).send("Faltan campos en el producto");
});

router.put("/actualizar/:id", administrador, async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const producto = await ProductosController.actualizar(id, body);
  producto ? res.json(producto) : res.status(404).send(`No se encontró el producto con id ${id}`);
});

router.delete("/borrar/:id", administrador, async (req, res) => {
  const { id } = req.params;
  const producto = await ProductosController.borrar(id);
  producto ? res.json(producto) : res.status(404).send(`No se encontró el producto con id ${id}`);
});

module.exports = router;

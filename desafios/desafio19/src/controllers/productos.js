const productService = require('../services/productService');
const logger = require('../utils/logger');

const getProductosTest = async (req, res, next) => {
  try {
    const arrayDeProductos = await productService.getAll();
    if (arrayDeProductos.length === 0) {
      throw new Error("No hay productos");
    }
    res.render("datos", { arrayDeProductos });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const producto = await productService.getById(Number(req.params.id)).then((resolve) => resolve);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    res.json(producto);
  } catch (err) {
    next(err);
  }
};

const postProducto = async (req, res, next) => {
  try {
    res.json(await productService.popular(req.query.cant));
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const producto = await productService.getById(+req.params.id).then((res) => res);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    await productService.update(+req.params.id,req.body.title,req.body.price,req.body.thumbnail).then((resolve) => {
      res.json(resolve);
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const producto = await productService.getById(+req.params.id).then((resolve) => resolve);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    await productService.deleteById(+req.params.id).then((resolve) => {
      res.json(`${producto.title} se borro con éxito`);
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {getProductosTest, getProductById, postProducto, updateProduct, deleteProduct};
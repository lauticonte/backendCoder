const logger = require('../utils/logger');
const CartModel = require("../models/cartSchema");

class Carritos {
  constructor() {}

  async getProductsFromCart(id) {
    try {
      const carrito = await CartModel.findById(id);
      if (!carrito) {
        throw new Error("Carrito no encontrado");
      }
      const productos = await CartModel.findById(id).populate('productos').populate('usuario');
      if (!productos) {
        throw new Error("No hay productos en el carrito");
      }
      return productos;
    } catch (error) {
      logger.warn(error);
    }
  }
  
  async createCart(obj) {
    try {
      obj.timestamp = Date.now();
      const carritoSaveModel = new CartModel(obj);
      const savedCart = await CartModel.insertMany(carritoSaveModel).then((carrito) => carrito).catch((err) => {
        throw new Error(err);
      });
      return savedCart;
    } catch (error) {
      logger.warn(error);
    }
  }

  async addProductToCart(id, product) {
    try {
      const carrito = await CartModel.findByIdAndUpdate(id, { $push: { productos: product }}, { new: true}).then((carrito) => carrito).catch((err) => {
        throw new Error(err);
      });
      return carrito;
    } catch (error) {
      logger.warn(error);
    }
  }
  
  async deleteCartById(id) {
    try {
      const carrito = await CartModel.findById(id);
      if (!carrito) {
        throw new Error ("Carrito no encontrado");
      }
      const deletedCart = await CartModel.deleteOne(carrito).then((deleted) => deleted).catch((err) => {
        throw new Error(err);
      });
      return deletedCart;
    } catch (error) {
      logger.warn(error);
    }
  }

  async deleteProductFromCart(id, id_prod) {
    try {
      const carrito = await CartModel.findById(id);
      if (!carrito) {
        throw new Error("Carrito no encontrado");
      }
      const product = await CartModel.findOne({ _id: id, productos: id_prod});
      if (!product) {
        throw new Error("Producto no encontrado en el carrito");
      }
      const deleteProduct = await CartModel.findByIdAndUpdate(id, { $pull: { productos: id_prod}}, { new: true}).then((product) => product).catch((err) => {
        throw new Error(err);
      });
      return product;
    } catch (error) {
      logger.warn(error);
    }
  }
}

module.exports = Carritos;
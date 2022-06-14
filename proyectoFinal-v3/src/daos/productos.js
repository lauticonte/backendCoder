const logger = require('../utils/logger');
const productModel = require("../models/productSchema");

class Productos {
  constructor() {}
  
  async getAllProducts() {
    try {
      const contenido = await productModel.find();
      if (!contenido) {
        throw new Error("No se encontraron productos");
      }
      return contenido;
    } catch (error) {
      logger.warn(error);
    }
  }
  
  async getProductById(id) {
    try {
      const producto = await productModel.findById(id);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      return producto;
    } catch (error) {
      logger.warn(error);
    }
  }
  
  async saveProduct(obj) {
    try {
      obj.timestamp = Date.now();
      const productoSaveModel = new productModel(obj);
      const savedProduct = await productModel.insertMany(productoSaveModel).then((producto) => producto).catch((err) => {
        throw new Error(err);
      });
      return savedProduct;
    } catch (error) {
      logger.warn(error);
    }
  }
  
  async deleteProductById(id) {
    try {
      const producto = await this.getProductById(id);
      if (!producto) {
        throw new Error ("Producto no encontrado");
      }
      const deletedProduct = await productModel.deleteOne(producto).then((deleted) => deleted).catch((err) => {
        throw new Error(err);
      });
      return deletedProduct;
    }    catch (error) {
      logger.warn(error);
    }
  }
  
  async updateProduct(id, title, description, code, price, thumbnail, stock) {
    try {
      const producto = await this.getProductById(id);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      const updatedProduct = await productModel.findByIdAndUpdate(id, { $set: {
        title: title,
        description: description,
        code: code,
        price: price,
        thumbnail: thumbnail,
        stock: stock
      }}, { new: true}).then((product) => product).catch((err) => {
        throw new Error(err);
      });
      return updatedProduct;
    } catch (error) {
      logger.warn(error);
    }
  }
}

module.exports = Productos;

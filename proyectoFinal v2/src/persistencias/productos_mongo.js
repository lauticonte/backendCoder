const Producto = require("../modelsMongoose/Producto");
const InterfaceFactory = require("../Factories/InterfaceFactory");

class ProductosService extends InterfaceFactory {
  constructor() {
    super();
  }

  async listar() {
    try {
      let productos = await Producto.find({}).lean();
      return productos;
    } catch (error) {
      throw error;
    }
  }

  async listarId(id) {
    try {
      let producto = await Producto.findById(id);
      console.log(producto)
      return producto;
    } catch (error) {
      throw error;
    }
  }

  async guardar(body) {
    try {
      let producto = await Producto.create(body);
      return producto;
    } catch (error) {
      throw error;
    }
  }

  async actualizar(id, newProduct) {
    try {
      let producto = await Producto.findByIdAndUpdate(id, newProduct);
      return producto;
    } catch (error) {
      throw error;
    }
  }

  async borrar(id) {
    try {
      let product = await Producto.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductosService();

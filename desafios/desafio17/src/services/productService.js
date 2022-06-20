const ProductAdapter = require('../adapters/productAdapter');
const ProductRepo = require('../repos/productRepo');
const Product = require('../models/productoModel')
const generarIds = require('../utils/generador-ids')
const logger = require('../utils/logger')

class ProductService {
  constructor() {
    this.repo = new ProductRepo()
  }

  async getAll() {
    try {
      const productos = mostrar(await this.repo.getAll());
      return productos;
    } catch (error) {
      logger.error(error);
    }
  }

  async getById(id) {
    try {
      const producto = mostrar(await this.repo.getById(id))
      return producto;
    } catch (error) {
      logger.error(error)
    }
  }

  async save(producto) {
    try {
      producto.id = generarIds()
      const nuevoProducto = new Product(producto)
      const productAñadido = await this.repo.add(nuevoProducto)
      return productAñadido
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteById(id) {
    try {
      const productDeleted = await this.repo.removeById(id)
      return productDeleted
    } catch (error) {
      logger.error(error)
    }
  }
  async deleteAll() {
    try {
      const productos = this.repo.removeAll()
      return productos;
    } catch (error) {
      logger.error(error)
    }
  }
}

function mostrar(data) {
  if (Array.isArray(data)) {
    if (data.length > 0) {
      for (const producto of data) {
        return new ProductAdapter(producto).textoPlano()
      }
    } else {
      logger.info('No hay datos para mostrar')
    }
  } else {
    return new ProductAdapter(data).textoPlano()
  }
}

const productService = new ProductService()

module.exports = productService;
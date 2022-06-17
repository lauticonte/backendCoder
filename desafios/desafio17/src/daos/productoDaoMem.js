const {asProductDto} = require('../dtos/productoDto')
const generarProductos = require('../utils/generador-productos')
const generarIds = require('../utils/generador-ids')
const logger = require('../utils/logger');

class ProductoDaoMem {
  constructor() {
    this.productos = []    
  }

  init() {
    logger.info('productos dao en memoria -> listo')
  }

  disconnect() {
    logger.info('productos dao en memoria -> cerrado')
  }

  #getIndex(id) {
    return this.productos.findIndex(producto => producto.id === id)
  }

  getAll() {
    return asProductDto(this.productos)
  }

  getById(id) {
    return asProductDto(this.productos[ this.#getIndex(id) ])
  }

  save(obj) {
    this.productos.push(obj)
    return asProductDto(obj)
  }
  popular(cant = 5) {
    const nuevos = []
    for (let i = 0; i < cant; i++) {
      const nuevoProducto = generarProductos(generarIds())
      const guardado = this.save(nuevoProducto)
      nuevos.push(guardado)
    }
    return asProductDto(nuevos)
  }

  deleteAll() {
    this.productos = []
  }

  deleteById(id) {
    const [ borrada ] = this.productos.splice(this.#getIndex(id), 1)
    return asProductDto(borrada)
  }

  update(id, campos) {
    const index = this.#getIndex(id)
    const actualizada = { ...this.productos[ index ], ...campos }
    this.productos.splice(index, 1, actualizada)
    return asProductDto(actualizada)
  }
}

module.exports = ProductoDaoMem;

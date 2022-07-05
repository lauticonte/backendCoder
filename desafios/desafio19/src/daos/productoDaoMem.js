const generarProductos = require('../utils/generador-productos')
const generarIds = require('../utils/generador-ids')

class ProductoDaoMem {
  constructor() {
    this.productos = []    
  }

  init() {
    console.log('productos dao en memoria -> listo')
  }

  disconnect() {
    console.log('productos dao en memoria -> cerrado')
  }

  #getIndex(id) {
    return this.productos.findIndex(producto => producto.id === id)
  }

  getAll() {
    return asDto(this.productos)
  }

  getById(id) {
    return asDto(this.productos[ this.#getIndex(id) ])
  }

  save(obj) {
    this.productos.push(obj)
    return asDto(obj)
  }
  popular(cant = 5) {
    const nuevos = []
    for (let i = 0; i < cant; i++) {
      const nuevoProducto = generarProductos(generarIds())
      const guardado = this.save(nuevoProducto)
      nuevos.push(guardado)
    }
    return asDto(nuevos)
  }

  deleteAll() {
    this.productos = []
  }

  deleteById(id) {
    const [ borrada ] = this.productos.splice(this.#getIndex(id), 1)
    return asDto(borrada)
  }

  update(id, campos) {
    const index = this.#getIndex(id)
    const actualizada = { ...this.productos[ index ], ...campos }
    this.productos.splice(index, 1, actualizada)
    return asDto(actualizada)
  }
}

module.exports = ProductoDaoMem;

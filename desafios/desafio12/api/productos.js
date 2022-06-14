const Contenedor = require('../contenedores/contenedor');
const generarProductos = require('../utils/generador-productos')
const generarIds = require('../utils/generador-ids')

class ApiProductosMock extends Contenedor {
  constructor() { super() }

  popular(cant = 5) {
    const nuevos = []
    for (let i = 0; i < cant; i++) {
      const nuevoProducto = generarProductos(generarIds())
      const guardado = this.save(nuevoProducto)
      nuevos.push(guardado)
    }
  return nuevos
  }
}

module.exports = ApiProductosMock
class Contenedor {
  constructor() {
    this.productos = []    
  }

  getAll() {
    return [ ...this.productos ]
  }

  getById(id) {
    const elem = this.productos.find(elem => elem.id == id)
    if (!elem) {
      throw new Error(`Error al listar: elemento no encontrado`)
    } else {
      return elem
    }
  }

  save(obj) {
    this.productos.push(obj)
    return obj
  }

  deleteAll() {
    this.productos = []
  }

  deleteById(id) {
    const index = this.productos.findIndex(elem => elem.id == id)
    if (index == -1) {
      throw new Error(`Error al borrar: elemento no encontrado`)
    } else {
      return this.productos.splice(index, 1)
    }
  }

  update(elem) {
    elem.id = +elem.id
    const index = this.productos.findIndex(p => p.id == elem.id)
    if (index == -1) {
      throw new Error(`Error al actualizar: elemento no encontrado`)
    } else {
      this.elementos[ index ] = elem
      return elem
    }  
  }
}

module.exports = Contenedor;

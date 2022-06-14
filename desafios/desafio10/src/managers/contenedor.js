class Contenedor {
  constructor() {
    this.productos = []
  }

  getAll(){
    return [ ... this.productos]
  }

  getById(id){
    const elem = this.productos.find(elem => elem.id === id)
    if (!elem) {
      throw new Error(`No existe el producto con id ${id}`)
    }else{
      return elem
    }
}

  save(obj) {
    this.productos.push(obj)
    return obj
  }

  deleteAll(){
    this.productos = []
  }

  deleteById(id){
    const index = this.productos.findIndex(elem => elem.id === id)
    if (index == -1) {
      throw new Error(`No existe el producto con id ${id}`)
    }else{
      this.productos.splice(index, 1)
    }
  }

  update(elem) {
    elem.id = +elem.id
    const index = this.productos.findIndex(elem => elem.id === elem.id)
    if (index == -1) {
      throw new Error(`No existe el producto con id ${elem.id}`)
    }else{
      this.productos[index] = elem
      return elem
    }
  }
}

module.exports = Contenedor;
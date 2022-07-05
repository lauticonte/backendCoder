const fs = require("fs");
const generarProductos = require('../utils/generador-productos')
const generarIds = require('../utils/generador-ids')

class ProductoDaoFile {
  #ready = false;
  constructor(archivo) {
    this.archivo = archivo;
    this.productos = []
  }
  async init() {
    try {
      await fs.promises.readFile(this.archivo, 'utf-8')
      this.#ready = true
      console.log('productos dao en archivo -> listo')
    } catch (error) {
      await fs.promises.writeFile(this.archivo, '[]')
      this.#ready = true
      console.log('Productos dao en archivo -> listo')
    }
  }

  disconnect() {
    console.log('productos dao en archivo -> cerrado')
  }

  #checkReady() {
    if (!this.#ready) throw new Error('INTERNAL_ERROR: dao no conectado!')
  }

  async #leerArchivo() {
    this.#checkReady()
    const texto = await fs.promises.readFile(this.archivo, 'utf-8')
    this.productos = JSON.parse(texto)
  }

  async #escribirArchivo() {
    this.#checkReady()
    const texto = JSON.stringify(this.productos, null, 2)
    await fs.promises.writeFile(this.archivo, texto)
  }

  #getIndex(id) {
    return this.productos.findIndex(producto => producto.id === id)
  }

  async getAll() {
    await this.#leerArchivo()
    return asDto(this.productos);
  }

  async getById(id) {
    await this.#leerArchivo()
    return asDto(this.productos[ this.#getIndex(id) ])
  }

  async save(obj) {
    await this.#leerArchivo()
    this.productos.push(o)
    await this.#escribirArchivo()
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

  async deleteById(idParaBorrar) {
    await this.#leerArchivo()
    const [ borrada ] = this.productos.splice(this.#getIndex(idParaBorrar), 1)
    await this.#escribirArchivo()
    return asDto(borrada)
}

  async deleteAll() {
    this.productos = []
    await this.#escribirArchivo()
  }

  async update(id, campos) {
    await this.#leerArchivo()
    const index = this.#getIndex(id)
    const actualizada = { ...this.productos[ index ], ...campos }
    this.productos.splice(index, 1, actualizada)
    await this.#escribirArchivo()
    return asDto(actualizada)
  }
}

module.exports = ProductoDaoFile;

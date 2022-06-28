const ProductoDaoFactory = require("../factory/productoFactory");
const Product = require('../models/productoModel')
const {asProductDto} = require("../dtos/productoDto");

class ProductRepo {
  #dao
  constructor() {
    this.#dao = ProductoDaoFactory.getDao()
    this.#dao.init()
  }

  async getAll() {
    const products = await this.#dao.getAll()
    return products.map(p => new Product(p))
  }

  async getById(id) {
    const dto = await this.#dao.getById(id)
    return new Product(dto)
  }

  async add(newProduct) {
    await this.#dao.save(asProductDto(newProduct))
  }

  async popular(cant) {
    await this.#dao.popular(cant)
  }

  async removeById(id) {
    const deleted = await this.#dao.deleteById(id)
    return new Product(deleted)
  }

  async removeAll() {
    await this.#dao.deleteAll()
  }
}

module.exports = ProductRepo;
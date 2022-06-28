const ProductoDaoFile = require('../daos/ProductoDaoFile')
const ProductoDaoMem = require('../daos/productoDaoMem');
const rutaProductos = './productos.txt'

const opcion = process.argv[ 2 ] || "Mem"

let dao;

switch (opcion) {
  case 'File':
    dao = new ProductoDaoFile(rutaProductos)
    dao.init()
  break
  default:
    dao = new ProductoDaoMem()
    dao.init()
}

module.exports = class ProductoDaoFactory {
  static getDao() {
    return dao
  }
}
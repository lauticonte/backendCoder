const factory = require("../Factories/Factory");
const ProductosService = factory.getPersistencia("productos");

class ProductosController {
  // constructor() {
  //   this.arrayProductos = [];
  // }

  async listar() {
    const productos = await ProductosService.listar();
    // this.arrayProductos = productos;
    return productos.length > 0 ? productos : { error: "no hay productos cargados" };
  }

  async listarId(id) {
   const productos = await ProductosService.listar();
    const producto = await productos.find(prod => {
      return prod._id == id;
    });
    return producto ?? null;
  }

  async guardar(body) {
    // const productos = await ProductosService.listar();
    let { nombre, precio, foto, descripcion, codigo, stock } = body;
    if (nombre && precio && foto && descripcion && codigo && stock) {
      // // ID AUTOINCREMENTAL
      // const idArray = Math.max.apply(
      //   Math,
      //   this.arrayProductos.map(prod => {
      //     return prod.id;
      //   })
      // );
      // const id = idArray + 1;

      // const time = new Date();
      // const timestamp = time.toUTCString();
      const producto = { nombre, descripcion, precio, foto, codigo, stock };
      // this.arrayProductos.push(producto);

      ProductosService.guardar(producto);
      return producto;
    } else return;
  }

  async actualizar(id, body) {
    let productExists = await this.listarId(id);
    console.log(productExists)

    if (productExists) {
      const newProduct = Object.assign(productExists, body);
      const product = await ProductosService.actualizar(id, newProduct);
      return newProduct;
    } else return;
  }

  async borrar(id) {
    let productExists = this.listarId(id);

    if (productExists) {
      const product = await ProductosService.borrar(id)
      return productExists;
    } else return;
  }
}

module.exports = new ProductosController();

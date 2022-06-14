// const ProductosService = require("../persistencia/productos");
// const CarritoService = require("../persistencia/carrito");
const ProductosController = require("../api/productos");


const modulo = require("../Factories/Factory");
// elección de persistencia:
const persistencia = modulo.getPersistencia("carrito", "mongo")
// const persistencia = modulo.getPersistencia("carrito", "mysql")
// const persistencia = modulo.getPersistencia("carrito", "fs")

const CarritoService = persistencia


class CarritoController {
  constructor() {
    this.arrayCarrito = [];
  }

  // async create(req, res) {
  //     const id = await CarritoService.save({ products: [] })
  //     res.json({ id });
  //   }

  async listar() {
    const carrito = await CarritoService.listar();
    this.arrayCarrito = carrito;
    return carrito.length > 0 ? carrito : { error: "no hay productos cargados en el carrito" };
  }

  async listarId(id) {
    this.arrayCarrito = await CarritoService.listar();
    const carrito = await this.arrayCarrito.find(prod => {
      return prod.id == id;
    });
    return carrito ?? null;
  }

  async guardar(id_producto) {
    this.arrayCarrito = await CarritoService.listar();
    let productExists = await ProductosController.listarId(id_producto);

    if (productExists) {
      // ID AUTOINCREMENTAL
      const idArray = Math.max.apply(
        Math,
        this.arrayCarrito.map(prod => {
          return prod.id;
        })
      );
      const id = idArray + 1;

      const time = new Date();
      const timestamp = time.toUTCString();
      let productCarrito = { id, timestamp, producto: { ...productExists } };
      this.arrayCarrito.push(productCarrito);

      CarritoService.agregar(this.arrayCarrito);
      return productExists;
    } else return;
  }

  async borrar(id) {
    let carritoExists = await this.listarId(id);
    this.arrayCarrito = await CarritoService.listar();

    if (carritoExists) {
      this.arrayCarrito = this.arrayCarrito.filter(carrito => carrito.id != id);
      CarritoService.agregar(this.arrayCarrito);
      return carritoExists;
    } else return;
  }
}

module.exports = new CarritoController();

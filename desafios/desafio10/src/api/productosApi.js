const Contenedor = require('../managers/contenedor.js');
const generarProductos = require('../utils/generadorProductos.js');
const generarId = require('../utils/generadorId.js');

class ApiProductosMock extends Contenedor {
    constructor() { super() }

    products(cant = 5) {
        const nuevos = [];
        for (let i=0; i<cant; i++) {
            const nuevoProducto = generarProductos(generarId());
            const guardado = this.save(nuevoProducto);
            nuevos.push(guardado);
        }
        return nuevos
    }
}

module.exports = ApiProductosMock;
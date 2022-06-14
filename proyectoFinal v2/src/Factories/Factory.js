const persistenciaType = require("../config/config.json").persistencia;

class PersistenciaFactory {
  constructor() {
    this.persistencia = persistenciaType;
  }

  // carrito_prods: carrito o productos
  // type: fs, mongo o mysql
  getPersistencia(carrito_prods) {
    try {
      let modulo = require(`../persistencias/${carrito_prods}_${this.persistencia}.js`);
      console.log("modulo en factory", modulo);
      return modulo;
    } catch (e) {
      console.log(
        `No se encontró el tipo de persistencia: ${carrito_prods}_${this.persistencia}`,
        e
      );
    }
  }
}

module.exports = new PersistenciaFactory();

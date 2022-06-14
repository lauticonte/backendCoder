const fs = require("fs");

class CarritoService {
  async listar() {
    try {
      const lectura = await fs.promises.readFile(__dirname + "/carritoFile.txt", "utf-8");
      const productos = JSON.parse(lectura);
      return productos;
    } catch {
      return [];
    }
  }

  async agregar(arraycarrito) {
    try {
      const carrito = await fs.promises.writeFile(
        __dirname + "/carritoFile.txt",
        JSON.stringify(arraycarrito, null, "\t")
      );
    } catch {
      throw new Error("Error");
    }
  }
}

module.exports = new CarritoService();

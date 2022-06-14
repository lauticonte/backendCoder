const fs = require("fs");


class ProductosService {
  async listar() {
    try {
      const lectura = await fs.promises.readFile(__dirname + "/productosFile.txt", "utf-8");
      const productos = JSON.parse(lectura);
      return productos;
    } catch {
      return [];
    }
  }

  async agregar(arrayProductos) {
    try {
      const productos = await fs.promises.writeFile(
        __dirname + "/productosFile.txt",
        JSON.stringify(arrayProductos, null, "\t")
      );
    } catch {
      throw new Error("Error");
    }
  }
}

module.exports = new ProductosService();

const Contenedor = require("./metodos");

let prueba = new Contenedor("./productos.txt");
(async () => {
  //prueba getAll
  await prueba.getAll().then((res) => console.log(res));
  //fin prueba getAll

  //prueba save
  await prueba.save({
      title: "Computadora",
      price: 135000,
      thumbnail: "https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-37-256.png",
    })
    .then((res) => console.log(res, "\nProducto agregado con exito"));
  //fin prueba save

  //prueba getById
  await prueba.getById(3).then((res) => console.log(res));
  //fin prueba getById

  //prueba deleteById
  await prueba.deleteById(2).then((res) => console.log(res));
  console.log("Producto eliminado con exito");
  //fin prueba deleteById

  //prueba deleteAll
  await prueba.deleteAll().then((res) => console.log(res));
  console.log("Todos los productos han sido eliminados");
  //fin prueba deleteAll

})();
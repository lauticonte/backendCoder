const Contenedor = require("./metodos");
const express = require('express');
const app = express();

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });

let productos = new Contenedor("./productos.txt");

app.get('/', (req, res) =>{
    res.send(`Visite <a href="/productos">/productos</a> o <a href="/productoRandom">/productoRandom</a>`);
});

app.get('/productos', (req, res)=> {
    (async () => {
        await productos.getAll().then((resolve) => {
            res.send(resolve);
        });
    })();
});

app.get('/productoRandom', (req, res)=> {
    (async () => {
        let array = await productos.getAll().then((res) => res);
        if(array.length == 0) {
            res.status(404).send("No hay productos");
        }
        else {
            res.send(array[Math.floor(Math.random() * array.length)]);
        }
    })();
});



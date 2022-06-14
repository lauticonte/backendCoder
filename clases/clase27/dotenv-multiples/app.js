const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config({
    path: ".env.development"
});

console.log(process.env.URL_DB);
const URL = process.env.URL_DB;

app.get('/datos', (req, res) => {
    fetch(URL)
        .then(res => res.json())
        .then(data => res.send(data))


});


const app = express();
app.listen(8080, () => {console.log(`Servidor corriendo en el puerto 8080`)});
import express from 'express';

const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

const app = express();
const server = app.listen(8080,()=>{
    console.log("Now listening");
})

app.get('/test',(req,res)=>{
    let array = [];
    for(let i=0; i<10; i++){
        array.push({
            nombre: nombres[Math.floor(Math.random()*5)],
            apellido: apellidos[Math.floor(Math.random()*5)],
            color: colores[Math.floor(Math.random()*5)]
        })
    }
    res.send(array);
})
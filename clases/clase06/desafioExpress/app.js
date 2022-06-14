const express = require('express');
const moment = require('moment');
const app = express();
const server = app.listen(8080,()=>{
    console.log("Listening on port 8080")
})

//A)
app.get('/',(req,res)=>{
    res.send('<h1 style="color: blue">Bienvenidos al Servidor Express</h1>')
})

//B)
let counter=0;
app.get('/visitas',(req,res)=>{
    counter++;
    res.send(`Has visitado este endpoint ${counter} veces`)
})

//C)
app.get('/fyh',(req,res)=>{
    let dateTime = moment();
    res.send({
        fyh: dateTime.format('DD/MM/YYYY hh:mm:ss')
    })
})

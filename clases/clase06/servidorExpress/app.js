const express = require('express'); //promodulo

const app = express(); //lo inicializo, app contiene la inicializacion de express

const connectedServer = app.listen(8080,()=>{
    console.log("Listening on port 8080");
})

//GET PUT DELETE HEAD
//con get le decis que rutas pueden solicitarte
app.get('/',(request,response)=>{
    response.send("Hola")
})


// un ejemplo si quiero permitir q solicite la ruta user
// request y response se resumen en req y res
app.get('/user',(req,res)=>{
    res.send({
        nombre: "Lautaro",
        apellido: "Conte",
        age: 20,
        mail: "lauty.conte@gmail.com"
    })
})


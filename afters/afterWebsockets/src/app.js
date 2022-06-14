const express = require('express');
const { Server } = require('socket.io');
const PetManager = require('./Manager/PetManager.js');

//services
const petService = new PetManager();
const app = express();
const server = app.listen(8080,()=> console.log(`Listening on 8080`))
const io = new Server(server);

app.use(express.static(__dirname+'/public'))

io.on('connection', socket =>{
    console.log("Cliente conectado")

    socket.on('sendPet', async data =>{
        await petService.add(data);
        let pets = await petService.getAll();
        io.emit('petlog', pets)
    })
})
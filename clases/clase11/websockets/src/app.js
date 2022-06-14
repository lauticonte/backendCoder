const express = require('express');
const { Server } = require('socket.io');

const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

//===========MIDDLEWARE==========//
app.use(express.static(__dirname+'/public'))

const io = new Server(server)

let log = [];

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!');
    socket.emit('history', log);
    socket.on('message', data =>{
        log.push({userId:socket.id, message:data});
        io.emit('history', log)
    })
});


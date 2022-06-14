const express = require('express');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=> console.log(`Listening on ${PORT}`));
const io = new Server(server);

let log = [];

app.use(express.static(__dirname+'/public'));

io.on('connection', (socket)=>{
    //brodcast sirve para avisar a todos los sockets 
    //(menos a vos) que te conectaste
    socket.broadcast.emit('newUser')

    socket.on('message', data=>{
        log.push(data);
        io.emit('log', log);
    })
    socket.on('registered', data => {
        socket.emit('log', log);
    })
});

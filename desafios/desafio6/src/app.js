//=========== MODULOS ===========//
const express = require('express');
const apiProducts = require('./routes/products');
const fs = require('fs');
const handlebars = require('express-handlebars');
const path = require('path');
const { Server } = require('socket.io');
const Contenedor = require('./managers/contenedor');
const Chat = require('./managers/chat')

//=========== ROUTERS ===========//
const app = express();

//=========== MIDDLEWARES ===========//
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/', apiProducts);
app.use('/', express.static(__dirname+'/public'))
app.use((req, res, next) => {
    console.log(`Product Middleware, Time: ${Date.now()}`)
    next()
})

app.use(function (err, req, res, next) {
    console.error( err)
    res.status(500).send("Something it's wrong!")
})

//=========== MOTOR DE PLANTILLAS ===========//
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts')
}));
app.set('view engine', 'handlebars');


//=========== VARIABLES ===========//
let products = new Contenedor('./files/productos.txt');
let chat = new Chat('./files/chat.txt');

let listProducts = []

try {
    let products = new Contenedor('./files/productos.txt');
    const data = async () => await products.getAll()
    data().then( list => {
        listProducts = list
    })
} catch (error) {
    console.error(error)
}


//=========== SERVER ===========//
const PORT = process.env.PORT||8080;
const server = app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));

//=========== SOCKET ===========//
const io = new Server(server);

io.on('connection', async (socket) => {
    console.log('User connected')

    const arrayProduct = await products.getAll().then((resolve) => resolve);
    const messages = await chat.getMessages().then((res) => res);

    socket.emit("products", arrayProduct);
    socket.emit("messages", messages);

    socket.on("new-product", async (data) => {
        await products.save(data).then((resolve) => resolve);
        const arrayProduct = await products
          .getAll()
          .then((resolve) => resolve);
        io.sockets.emit("products", arrayProduct);
      });
    
    socket.on("new-message", async (data) => {
        await chat.saveMessages(data).then((resolve) => resolve);
        const messages = await chat.getMessages().then((resolve) => resolve);
        io.sockets.emit("messages", messages);
      });
});
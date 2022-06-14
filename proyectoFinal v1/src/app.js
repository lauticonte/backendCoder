//=========== MODULOS ===========//
const express = require('express');
const apiProducts = require('./routes/productRoutes');
const apiCart = require('./routes/cartRoutes');

//=========== EXPRESS ===========//
const app = express();

//=========== MIDDLEWARES ===========//
const middlewares = require('./managers/Middlewares');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/', express.static(__dirname+'/public'))

app.use('/api/productos', apiProducts);
app.use('/api/carrito', apiCart)

app.use(middlewares.errorHandler);
app.use(middlewares.notFound);

//=========== SERVER ===========//
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));

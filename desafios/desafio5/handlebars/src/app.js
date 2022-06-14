//=========== MODULOS ===========//
const express = require('express');
const apiProducts = require('./routes/products');
const fs = require('fs');
const handlebars = require('express-handlebars');
const path = require('path');

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

//=========== SERVER ===========//
const PORT = 8080;
const server = app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));
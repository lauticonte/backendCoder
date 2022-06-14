//=========== MODULOS ===========//
const express = require('express');
const apiProducts = require('./routes/products')

//=========== ROUTERS ===========//
const app = express();

//=========== MIDDLEWARES ===========//
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api/products', apiProducts);
app.use(express.static(__dirname+'/public'))

app.use(function (err, req, res, next) {
    console.error( err)
    res.status(500).send("Something it's wrong!")
})

const PORT = 8080;
const server = app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));
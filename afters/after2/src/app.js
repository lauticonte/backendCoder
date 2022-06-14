const express = require('express');
const petsRouter = require('./routes/pets');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/pets',petsRouter);
app.use(express.static(__dirname+'/public'))

const PORT = 8080;
const server = app.listen(PORT, ()=>console.log(`Listening on ${PORT}`));


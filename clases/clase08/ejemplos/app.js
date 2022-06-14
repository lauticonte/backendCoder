const express = require('express');
const usersRouter = require('./routes/users');
const petsRouter = require('./routes/pets');

const app = express();

const PORT = 8080;
const server = app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));

//use tiene prioridades, si antes del json pasa por router, no llega a leerlo
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//elegis la carpeta q queres que se vea, por convencion, public
app.use(express.static('public'));
//puedo ingresar localhost:8080/nombrearchivo



app.use('/users', usersRouter);
app.use('/pets', petsRouter)

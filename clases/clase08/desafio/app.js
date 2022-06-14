const express = require('express');
const multer = require('multer');
const usersRouter = require('./routes/users');
const petsRouter = require('./routes/pets');

const app = express();

const PORT = 8080;
const server = app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));

//use tiene prioridades, si antes del json pasa por router, no llega a leerlo
app.use(express.urlencoded({extended:true}));
//elegis la carpeta q queres que se vea, por convencion, public
app.use(express.static(__dirname+'/public'))
//puedo ingresar localhost:8080/nombrearchivo
app.use(express.json());

app.use('/users', usersRouter);
app.use('/pets', petsRouter)


//========= MULTER =========//
//Multer recibe las cosas en form-data no en json (postman)
//en postman pongo el nombre del middleware (uploader.single('nombre') y elijo file como metodo)
//Storage
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/img')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+"="+file.originalname);
    }
})
//Middleware
let uploader = multer({storage:storage})

app.post('/upload', uploader.single('file') ,(req,res)=>{
    res.send({messaage: "ok"})

})

//.single es para 1 archivo, .array para multiples
app.post('/uploadMultiple', uploader.array('files') ,(req,res)=>{
    res.send({messaage: "ok"})

})
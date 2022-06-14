const express = require ('express');
const app = express();
const server = app.listen(8080,()=>console.log('now listening'));

app.use(express.static(__dirname+'/public'))
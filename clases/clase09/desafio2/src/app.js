const express = require ('express');
const fs = require('fs');
const app = express();
const server = app.listen(8080,()=>console.log('now listening'));

app.engine('cte', (filePath,objectToReplace,callback)=>{
    fs.readFile(filePath,(err,content)=>{
        if(err) return callback(new Error(err))
        const template = content.toString()
        .replace("^^titulo$$",''+objectToReplace.titulo)
        .replace("^^mensaje$$",''+objectToReplace.mensaje)
        return callback(null,template);
    })
})

app.set('views','./views')
app.set('view engine','cte')
app.get('/',(req,res)=>{
    res.render('Bienvenida', {
        titulo:"PLANTILLA PROPIA",
        mensaje:"Hola plantilla propia"
    })
})
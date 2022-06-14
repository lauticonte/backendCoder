const express = require('express');
const { render } = require('pug');
const app = express();

const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`))

app.set('views',__dirname+'/views')
app.set('view engine','pug')

app.get('/',(req,res)=>{
    res.render('hello',{

    })
})

app.get('/datos',(req,res)=>{
    let {min,nivel,max,titulo} = req.query;
    res.render('progress',{
        min:min,
        nivel:nivel,
        max:max,
        titulo:titulo
    })
})
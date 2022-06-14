const express = require('express');

const app = express();

const server = app.listen(8080, ()=> console.log('escuchando en 8080'));

const sentence = "Hola mundo como estan";

app.get('/api/sentence', (req, res) => {
    res.send({sentence: sentence})
})

//:num es un parametro
//req.params devuelve un string, hay q convertirlo
app.get('/api/letters/:num', (req, res) => {
    let param = req.params.num;
    if(isNaN(param)) return res.status(400).send({error: "Not a number"});
    let number = parseInt(param);
    if(number < 1 || number > sentence.length) return res.status(400).send({error: "Out of bounds"});
    res.send({letter: sentence.charAt(number-1)})
})

app.get('/api/words/:num', (req,res) => {
    let param = req.params.num;
    if(isNaN(param)) return res.status(400).send({error: "Not a number"});
    let number = parseInt(param);
    let array = sentence.split(" ");
    if(number < 1 || number > array.length) return res.status(400).send({error: "Out of bounds"});
    res.send({word:array[number-1]})
})

//el navegador siempre pide un get
//no puedo tirar solo el post
app.post('/hola', (req,res)=>{
    res.send("hola")
})
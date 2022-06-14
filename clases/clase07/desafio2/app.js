const express =  require('express');
const app = express();

const server = app.listen(8080, ()=>console.log("LISTENING ON 8080D"));

let sentence = "Frase inicial";

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api/sentence', (req,res)=>{
    res.send({sentence:sentence});
})

app.get('/api/words/:pos',(req,res)=>{
    let param = req.params.pos;
    if(isNaN(param)) return res.status(400).send({error: "Not a number"});
    let number = parseInt(param);
    let array = sentence.split(" ");
    if(number < 1 || number > array.length) return res.status(400).send({error: "Out of bounds"});
    res.send({word:array[number-1]})
})

app.post('/api/words', (req,res)=>{
    let clientWord = req.body.word;
    sentence = sentence.concat(` ${clientWord}`)
    res.send({sentence:sentence})
})

app.put('/api/words/:pos', (req,res)=>{
    let param = req.params.pos;
    let clientWord = req.body.word;
    if(isNaN(param)) return res.status(400).send({error: "Not a number"});
    let number = parseInt(param);
    let array = sentence.split(" ");
    if(number < 1 || number > array.length) return res.status(400).send({error: "Out of bounds"});
    array[number-1] = clientWord;
    sentence = array.join(' ');
    res.send({newSentence:sentence})

})

app.delete('/api/words/:pos', (req,res)=>{
    let param = req.params.pos;
    if(isNaN(param)) return res.status(400).send({error: "Not a number"});
    let number = parseInt(param);
    let array = sentence.split(" ");
    if(number < 1 || number > array.length) return res.status(400).send({error: "Out of bounds"});
    array.splice(number-1,1);
    sentence = array.join(' ');
    res.send({newSentence:sentence})
})
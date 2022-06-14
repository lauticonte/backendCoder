const express = require('express');

const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`))

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('hello',{
        message:"Holo todos"
    })
})

let consultaFalsaDeInformacion = () =>[
    {first_name:"Mauricio",family_name:"Manuel",last_name:"Conte"},
    {first_name:"Victor",family_name:"Ariel",last_name:"Sanchez"},
    {first_name:"Martin",last_name:"Fiori"}
]

app.get('/users',(req,res)=>{
    let users = consultaFalsaDeInformacion();
    res.render('users',{
        users
    })
})
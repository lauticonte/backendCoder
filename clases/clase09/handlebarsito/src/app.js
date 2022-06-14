const express = require ('express');
const handlebars = require('express-handlebars');
const app = express();
const server = app.listen(8080,()=>console.log('now listening to handlebars'));

app.engine('handlebars',handlebars.engine());
app.set('views','./views');
app.set('view engine','handlebars');

//este metodo es como si leyeras tus productos, usuarios, mascotas, etc
let llamadaABaseDeDatos = () =>{
    return [
        {first_name:"Lautaro",last_name:"Conte",age:20},
        {first_name:"Victor",last_name:"Ariel",age:32},
        {first_name:"Alan",last_name:"Alegre",age:27}
    ]
}

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/users',(req,res)=>{
    //Aca supongo que tome datos de mi archivo
    let users = llamadaABaseDeDatos();

    res.render('users',{
        users:users
    })
})
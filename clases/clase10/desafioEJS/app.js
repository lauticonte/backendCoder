const express = require('express');

const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`))

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let users = [];
app.get('/',(req,res)=>{
    res.render('home',{
        users
    })
})

app.post('/users',(req,res)=>{
    users.push(req.body);
    res.redirect('/')
})
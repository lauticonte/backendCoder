const express = require('express');

//archivo ligado a un router de donde se importe
const router = express.Router();

let users = [];

router.get('/',(req,res)=>{
    res.send({users:users})
})

//users no va en la ruta xq ya esta en el get de app.js
//router.get('/:id',(req,res)=>{
    //res.send(req.params.id)
//})

router.post('/',(req,res)=>{
    let user = req.body;
    console.log(user);
    users.push(user);
    res.send({message:"User Created"})

})

module.exports = router;
const express = require('express');
//archivo ligado a un router de donde se importe
const router = express.Router();

let pets = [];

router.get('/',(req,res)=>{
    res.send({pets:pets})
})

router.post('/',(req,res)=>{
    let pet = req.body;
    console.log(pets);
    pets.push(pet);
    res.send({message:"Pet Created"})

})

module.exports = router;
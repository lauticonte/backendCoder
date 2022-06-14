const express =  require('express');
const app = express();
const server = app.listen(8080, ()=>console.log("LISTENING ON 8080D"));

app.get('/api/sumar/:num1/:num2', (req,res)=>{
    let {num1,num2} = req.params;
    //le asigno a num1 el parametro num1 y lo mismo con num2
    num1=parseInt(num1);
    num2=parseInt(num2);
    res.send({result:num1+num2})
})

app.get('/api/sumar', (req,res)=>{
    let {num1,num2} = req.query;
    num1=parseInt(num1);
    num2=parseInt(num2);
    res.send({result:num1+num2})
})

app.get('/api/operacion/:operacion', (req,res)=>{
    let operacion = req.params.operacion;
    let num1 =parseInt(operacion.split('')[0]);
    let symbol = operacion.split('')[1];
    let num2 = parseInt(operacion.split('')[2]);
    if(symbol === "+") res.send({result:num1+num2});
    if(symbol === "-") res.send({result:num1-num2})
})


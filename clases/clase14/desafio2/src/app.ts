import express from 'express';
import { getTime } from './utils/utils';
import Person from './Person';

const person1:Person = new Person("Lautaro", "Conte");

const app = express();
const PORT = 8080;

app.get('/', (req,res)=>{
    res.send({
        time:getTime(),
        name:person1.getFullName()
    })
})

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
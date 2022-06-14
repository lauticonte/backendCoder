import express from 'express';

const app = express();
const server = app.listen(8080,()=>{
    console.log("Now listening");
})
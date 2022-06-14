const http = require('http');

const server = http.createServer((request,response)=>{
    console.log("Alguien me hizo una peticion");
    response.end("Hola mundo desde el maravilloso mundo del backend")
})

const connectedServer = server.listen(8080,()=>{
    console.log("Server listening on port 8080")
})
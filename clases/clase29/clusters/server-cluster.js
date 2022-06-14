const express = require('express');
const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;


const PORT = process.env.PORT || 8080;

const app = express();

app.get('/', (req, res) => {
    for(let i = 0;i<1e8;i++){
        // cluster.fork();
    }
    res.send(`Running process ${process.pid}`);
    }
);

if(cluster.isMaster){
    for(let i = 0;i<numCPUs;i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
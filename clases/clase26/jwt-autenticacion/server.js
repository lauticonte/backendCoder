const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'));

app.post('/login', (req, res) => {
    const userLogin = {
        username: 'admin',
        password: 'admin'
    };

    jwt.sign({ user: userLogin }, 'secretkey', (err, token) => {
        if(err) return res.send("error generando token")
        res.json({token: token})
    });
});

const isValidToken = (req, res, next) => {
    // console.log(req.headers);
    const headerToken = req.headers.authorization;
    if (typeof headerToken !== 'undefined') {
        const tokenArray = headerToken.split(' ');
        const token = tokenArray[1];
        console.log(token);
        jwt.verify(token, 'secretkey', (err, tokenDecoded) => {
            if (err) return res.send("error verificando token");
            res.json(tokenDecoded);
        });
        next();
    } else {
        res.send('No token provided');
    }
};

app.post('/datos-perfil', isValidToken, (req,res) => {
    res.send('Datos del perfil');
}); 

app.post('/modify-profile', isValidToken, (req,res) => {
    res.send('Datos del perfil');
});  
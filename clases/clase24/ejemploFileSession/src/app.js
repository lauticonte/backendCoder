import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import fileStrategy from 'session-file-store';

const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
const FileStorage = fileStrategy(session);

app.use(cookieParser());

//false xq la persistencia la manejo yo
//ttl no mata la cookie, sirve para q no se mantenga inactiva dsps de cierto tiempo
//secret es una clave para encriptar la cookie
app.use(session({
    store: new FileStorage({path: './src/sessions', ttl: 3600, retries: 0}),
    secret: "adueciaod2331sdf",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 20000
    }
}));

app.get('/',(req,res)=>{
    req.session.cualquiercosa = 2;
    res.send('Hola, su sesion ha iniciado')
})
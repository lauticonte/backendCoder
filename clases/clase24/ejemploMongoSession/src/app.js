import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Lautaro:<password>@codercluster18335.zy1j9.mongodb.net/mySessionsDB?retryWrites=true&w=majority',
        ttl: 20
    }),
    secret: "mongosecretcoderfeliz2022",
    resave: false,
    saveUninitialized: false
}))

app.get('/',(req,res)=>{
    req.session.cualquiercosa = "a";
    res.send('Hola, su sesion ha iniciado')
})
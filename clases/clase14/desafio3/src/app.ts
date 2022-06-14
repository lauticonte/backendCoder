import express, {Request,Response} from 'express';
import Perimeter from './clases/Perimeter';
import Surface from './clases/Surface';

const app = express();
const perimeterService = new Perimeter();
const surfaceService = new Surface();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>console.log(`Listening on ${PORT}`))

app.get('/operations', (req:Request, res:Response) => {
    let figure:string = req.query.figure;
    if(figure==="square"){
        let side:number = parseInt(req.query.side);
        res.send({figure, params:{side}, perimeter:perimeterService.square(side), surface:surfaceService.square(side)})
    }
    if(figure === "rectangle"){
        let width:number = parseInt
    }

})
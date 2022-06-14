import mongoose from "mongoose";
import { studentService } from "./model/students.js";
import { usersService } from "./model/user.js";

const URL = 'mongodb://127.0.0.1:27017/colegio'

mongoose.connect(URL,{useNewUrlParser:true, useUnifiedTopology:true})

const CRUD = async() => {
    const studentsToInsert = [
        { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
        { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
        { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
        { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
        { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
        { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
        { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
        { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
        { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
        { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
    ];

    //INSERT//
    // let result = await studentService.insertMany(studentsToInsert);
    // console.log(result);

    //UPDATE -- recordar que tiene que estar en el schema//
    // let usuarioUpdate = await studentService.updateOne({nombre:"Pedro"},{
    //     $set:{password: 12345}
    // })
    // console.log(usuarioUpdate);

    //READS//
    // let users = await studentService.find();
    // console.log(users);

    //DELETE//
    // let result = await studentService.deleteOne({nombre: "Daniel"});
    // console.log(result);


    //==== CONSULTAS DESAFIO =====//

    // -- orden alfabetico -- //
    // let students = await studentService.find().sort({nombre:1})
    // console.log(students);

    // -- estudiante mas joven -- //
    // let students = await studentService.find().sort({edad:1}).limit(1);
    // console.log(students);

    // -- estudiantes 2A -- //
    // let students = await studentService.find({curso:"2A"});
    // console.log(students);

    // -- segundo estudiante mas joven -- //
    // let students = await studentService.find().sort({edad:1}).skip(1).limit(1);
    // console.log(students);

    // -- NyA y curso ordenados por apellido de Z a A -- //
    // let students = await studentService.find({},{nombre:1,apellido:1,curso:1,_id:0}).sort({apellido:-1});
    // console.log(students);

    // -- nota de 10 -- //
    // let students = await studentService.find({nota:10});
    // console.log(students);

    // -- promedio notas de total de alumnos -- //
    // let students = await studentService.aggregate(
    //     [
    //         {
    //             $group:{
    //                 //grupo de todos los alumnos//
    //                 _id:1,
    //                 promedio:{$avg:"$nota"}
    //             }
    //         }
    //     ]
    // );
    // console.log(students);

    // -- promedio por grupo -- //
    // let students = await studentService.aggregate(
    //     [
    //         {
    //             $group:{
    //                 //grupo por curso
    //                 _id:"$curso",
    //                 promedio:{$avg:"$nota"}
    //             }
    //         }
    //     ]
    // );
    // console.log(students);

    // -- actualizad dni lucas blanco -- //
    // let students = await studentService.findOneAndUpdate({name:"Lucas", apellido:"Blanco"},{$set:{dni:"2035875"}});
    // console.log(students);

    // -- crear campos en todos los estudiantes -- //
    // let students = await studentService.updateMany({},{$set:{ingreso: false}});
    // console.log(students);

    // -- modificar segun curso -- //
    // let students = await studentService.updateMany({curso:"1A"},{$set:{ingreso:true}});
    // console.log(students);

    // -- solo aprobados -- //
    // let students = await studentService.find({nota:{$gte:4}},{_id:0, __v:0});
    // console.log(students);

    // -- solo ingresados -- //
    // let students = await studentService.find({ingreso:true},{_id:0, __v:0});
    // console.log(students);

    // -- borrar por ingreso = true -- //
    // let students = await studentService.deleteMany({ingreso:true});
    // console.log(students);


}

CRUD();

import options from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

// * SELECT ALL * //
// database.from('cars').select('*')
// .then(data => {
//     let cars = JSON.parse(JSON.stringify(data))
//     console.log(cars);
// })
// .catch(console.log)
// .finally(() => database.destroy())


// * SELECT WHERE * //
// database.from('cars').select('*').where('price','>',30000)
// .then(data => {
//     let cars = JSON.parse(JSON.stringify(data));
//     console.log(cars);
// })
// .catch(console.log)
// .finally(() => database.destroy())

// * SELECT BY ID * //
// database.from('cars').select('*').where('id',1)
// .then(data => {
//     let cars = JSON.parse(JSON.stringify(data));
//     console.log(cars);
// })
// .catch(console.log)
// .finally(() => database.destroy())

// * SELECT AND ORDER * //
database.from('cars').select('name', 'price').orderBy('price','desc')
.then(data => {
    let cars = JSON.parse(JSON.stringify(data));
    console.log(cars);
})
.catch(console.log)
.finally(() => database.destroy())
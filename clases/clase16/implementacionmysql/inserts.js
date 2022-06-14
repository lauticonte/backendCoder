import options from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);
const cars = [
    {name:"Volvo", price: 34123},
    {name:"Audi", price: 72345},
    {name:"Citroen", price: 54234},
    {name:"Hummer", price: 45632},
    {name:"Bentley", price: 53645},
    {name:"Volkswagen", price: 23122},
    {name:"Skoda", price: 65443},
    {name:"Mercedes", price: 87654}
]
database('cars').insert(cars)
.then(console.log)
.catch(console.log)
.finally(() => database.destroy())
import options from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

database.from('cars').where('name', 'Bentley').update({price: 20000})
.then(() => console.log("Car updated"))
.catch(console.log)
.finally(() => database.destroy())
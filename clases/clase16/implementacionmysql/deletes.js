import options from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

database.from('cars').where('price', '<', '25000').del()
.then(() => console.log("Cars deleted"))
.catch(console.log)
.finally(() => database.destroy())
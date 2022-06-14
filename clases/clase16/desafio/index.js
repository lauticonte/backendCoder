import options from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

const articulos = [
    {nombre:"Papas",codigo:"00123",precio:23.15,stock:3},
    {nombre:"Bebida",codigo:"32123",precio:15.50,stock:1},
    {nombre:"Hamburguesa",codigo:"01042",precio:50.20,stock:10},
    {nombre:"Dulces",codigo:"30134",precio:12.45,stock:25},
    {nombre:"Chocolates",codigo:"11232",precio:15.35,stock:2}    
]

const processDatabase = async() => {
    let tableExists = await database.schema.hasTable('articulos');
    if(tableExists){
        await database.schema.dropTable('articulos');
    }
    await database.schema.createTable('articulos', table => {
        table.increments('id');
        table.string('nombre', 15).nullable(false);
        table.string('codigo', 10).nullable(false);
        table.float('precio')
        table.integer('stock')
    })
    await database('articulos').insert(articulos);
    await database.from('articulos').where('id',3).del();
    await database.from('articulos').where('id',2).update({stock:0})

    let results = await database.from('articulos').select('*')
    let articles = JSON.parse(JSON.stringify(results));
    console.log(articles);
}

processDatabase();

const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
        filename: './managers/DB/ecommerce.sqlite'
    }
})

module.exports = knex;
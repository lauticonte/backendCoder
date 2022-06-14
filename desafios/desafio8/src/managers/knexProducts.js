const dotenv = require('dotenv').config()
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'admin',
        password: '',
        database: 'ecommerce'
    }
})

module.exports = knex
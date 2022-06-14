const knexProducts = require('./knexProducts');
const knexChat = require('./knexChat');

knexProducts.schema.hasTable('products').then(exists => {
    if (!exists) {
        return knex.schema.createTable('products', table => {
            table.increments('id')
            table.string('title')
            table.float('price')
            table.string('thumbnail')
        })
    }
    else {
        console.log('The table products has already exists')
    }
})

knexChat.schema.hasTable('messages').then(exists => {
    if (!exists) {
        return knexChat.schema.createTable('messages', table => {
            table.increments('id')
            table.string('email')
            table.string('message')
            table.date('date')
        })
    }
    else {
        console.log('The message table has already exists')
    }
})
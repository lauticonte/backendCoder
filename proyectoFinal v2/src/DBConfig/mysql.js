const mysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce',
        port: '3306'
    },
    pool: { min: 0, max: 10 }
}

module.exports = mysql;
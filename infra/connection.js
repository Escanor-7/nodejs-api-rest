const mySql = require('mysql');


const connection = mySql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'escanor7',
  database: 'agenda-petshop'
})

module.exports = connection;
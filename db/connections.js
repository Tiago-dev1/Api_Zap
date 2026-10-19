const mysql = require('mysql2/promise');

const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "whatsapp",
    port: 3306 
});

module.exports = conn;
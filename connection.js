const mysql = require("mysql2")

// Connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the classlist_db database.`)
);

db.connect(function(err){
    if (err) throw err
})

module.exports = db;
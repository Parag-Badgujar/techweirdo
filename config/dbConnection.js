const Pool = require('pg').Pool;
const connection = new Pool({
    user: process.env.DB_USER,
    host: process.env.IP,
    port: process.env.DB_PORT,
    database: process.env.DATABASE_NAME,
    password: process.env.DB_PASSWORD,

});

connection.connect(function (err, client) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("connected to database")
    }
})


module.exports = connection;
let mysql = require('mysql');
const config = require("./config");

let connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

// connection.connect(function (err) {
//   if (err) {
//     return console.error('error: ' + err.message);
//   }
//   console.log('Connected to the MySQL server.\n');
// });


module.exports = connection;
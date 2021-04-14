let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'ttsalpha',
  password: 'bonebone',
  database: 'thaobone'
});

connection.connect(function (err) {
  if (err)
    return console.error('error: ' + err.message);
  console.log('Connected to the MySQL server.\n');
});

// TEST: variable to execute a query against the database table authors:
connection.query('SELECT * FROM teacher where teacherID = 3', (err, rows) => {
  if (err) throw err;

  console.log('Data received from Db:');
  console.log(rows);

});

module.exports = connection;
// export default connection;
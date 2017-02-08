var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'node',
  password : 'tschi',
  database : 'pm'
});

connection.connect();

connection.query('SELECT * from pm.Geschaeft', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0]);
});

connection.end();
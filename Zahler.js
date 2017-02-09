//Zahler.js
var mysql = require('mysql');
var Zahler = function () { };
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'node',
    password: 'tschi',
    database: 'pm'
});


//init db connection
connection.connect();

/**
 * GetEntitySet
 */
Zahler.prototype.getZahlerEntitySet = function (callback) {


    connection.query('SELECT * from pm.Zahler', function (oError, aResults, oFields) {
        if (oError) {
            callback(oError, aResults);
        } else {
            callback(oError, aResults);
        }
    });
}



module.exports = Zahler;

//Einkauf.js
var mysql = require('mysql');
var Einkauf = function () { };
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
// Einkauf.prototype.getEinkaufEntitySet = function (callback) {


//     connection.query('SELECT * from pm.Einkauf', function (oError, aResults, oFields) {
//         if (oError) {
//             callback(oError, aResults);
//         } else {
//             callback(oError, aResults);
//         }
//     });
// }

/**
 * GetEntity
 */
// Einkauf.prototype.getEinkaufEntity = function (sGes_id, callback) {

//     connection.query('SELECT * from pm.Einkauf where ges_id = ' + sGes_id, function (oError, aResult, oFields) {
//         if (oError) {
//             callback(oError, aResult);
//         } else {
//             callback(oError, aResult);
//         }
//     });
// }

/**
 * DeleteEntity
 */
// Einkauf.prototype.deleteEinkaufEntity = function (sGes_id, callback) {

//     connection.query('DELETE from pm.Einkauf where ges_id = ' + sGes_id, function (oError, aResult, oFields) {
//         if (oError) {
//             callback(oError, aResult);
//         } else {
//             callback(oError, aResult);
//         }
//     });
// }

/**
 * InsertEntity
 */
Einkauf.prototype.insertEinkaufEntity = function (oEinkauf, callback) {
    //eliminate id because of autoincrement
    oEinkauf.eink_id = 0;

    connection.query("INSERT into pm.Einkauf SET ?", oEinkauf, function (oError, aResult, oFields) {

        if (oError) {
            callback(oError, aResult);
        } else {
            //get entity
            connection.query('SELECT * from pm.Einkauf where eink_id = ' + aResult.insertId, function (oError, aResult, oFields) {
                if (oError) {
                    callback(oError, aResult);
                } else {
                    callback(oError, aResult[0]);
                }
            });
        }
    });

}



module.exports = Einkauf;

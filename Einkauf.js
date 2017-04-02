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
Einkauf.prototype.getEinkaufEntitySet = function (callback) {
    connection.query('SELECT * from pm.Einkauf', function (oError, aResults, oFields) {
        if (oError) {
            callback(oError, aResults);
        } else {
            callback(oError, aResults);
        }
    });
}

/**
 * GetEntitySet with date range (startDate and endDate)
 */
Einkauf.prototype.getEinkaufEntitySetInRange = function (startDate, endDate, callback) {
    connection.query('SELECT * from pm.Einkauf where eink_datum between "' + startDate + '" and "' + endDate + '"', function (oError, aResults, oFields) {
        if (oError) {
            callback(oError, aResults);
        } else {
            callback(oError, aResults);
        }
    });
}

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
// Einkauf.prototype.deleteEinkaufEntity = function (sEink_id, callback) {

//     connection.query('DELETE from pm.Einkauf where eink_id = ' + sEink_id, function (oError, aResult, oFields) {
//         if (oError) {
//             callback(oError, aResult);
//         } else {
//             callback(oError, aResult);
//         }
//     });
// }

/**
 * DeleteEntity 
 * * also delete geschaeft counter
 */
Einkauf.prototype.deleteEinkaufEntity = function (sEink_id, callback) {

    connection.query('SELECT * from pm.Einkauf where eink_id = ' + sEink_id, function (oError, aResult, oFields) {
        if (oError) {
            callback(oError, aResult);
        } else {
            var iGesId = aResult[0].ges_id;

            connection.query('SELECT * from pm.Geschaeft where ges_id = ' + iGesId, function (oError, aResult, oFields) {
                if (oError) {
                    callback(oError, aResult);
                } else {
                    var iDecrementedGesCount = aResult[0].ges_besuche - 1;

                    //delete einkauf
                    connection.query('DELETE from pm.Einkauf where eink_id = ' + sEink_id, function (oError, aResult, oFields) {
                        if (oError) {
                            callback(oError, aResult);
                        } else {
                            //update geschaeft ges_besuche
                            connection.query('UPDATE pm.Geschaeft SET ges_besuche=' + iDecrementedGesCount + ' where ges_id=' + iGesId, function (oError, aResult, oFields) { console.log(oError) });
                            callback(oError, aResult[0]);
                        }
                    });
                }
            });
        }
    });
}

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
                    connection.query('SELECT * from pm.Geschaeft where ges_id = ' + aResult[0].ges_id, function (oError, aResult, oFields) {
                        if (oError) {
                            //error
                        } else {
                            aResult[0].ges_besuche = parseInt(aResult[0].ges_besuche) + parseInt(1);
                            connection.query('UPDATE pm.Geschaeft SET ges_besuche=' + aResult[0].ges_besuche + ' where ges_id=' + aResult[0].ges_id, function (oError, aResult, oFields) { console.log(oError) });
                            callback(oError, aResult[0]);
                        }
                    });
                }
            });
        }
    });

}



module.exports = Einkauf;
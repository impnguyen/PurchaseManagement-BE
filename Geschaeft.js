//Geschaeft.js
var mysql = require('mysql');
var Geschaeft = function () { };
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
Geschaeft.prototype.getGeschaeftEntitySet = function (callback) {


    connection.query('SELECT * from pm.Geschaeft', function (oError, aResults, oFields) {
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
Geschaeft.prototype.getGeschaeftEntity = function (sGes_id, callback) {

    connection.query('SELECT * from pm.Geschaeft where ges_id = ' + sGes_id, function (oError, aResult, oFields) {
        if (oError) {
            callback(oError, aResult);
        } else {
            callback(oError, aResult);
        }
    });
}

/**
 * DeleteEntity
 * @todo darf nur gelöscht werden, wenn keine einträge von einkauf mit geschaeft verbunden sind
 */
Geschaeft.prototype.deleteGeschaeftEntity = function (sGes_id, callback) {

    connection.query('SELECT * from pm.Einkauf where ges_id = ' + sGes_id, function (oError, aResult, oFields) {
        if (oError) {
            callback(oError, aResult);
        } else {
            if (aResult.length === 0) {
                connection.query('DELETE from pm.Geschaeft where ges_id = ' + sGes_id, function (oError, aResult, oFields) {
                    if (oError) {
                        callback(oError, aResult);
                    } else {
                        callback(oError, aResult);
                    }
                });
            } else {
                callback({errorMessage:'Es sind noch Einkäufe mit diesem Geschäft verknüpft.'});
            }
        }
    });


}

/**
 * InsertEntity
 */
Geschaeft.prototype.insertGeschaeftEntity = function (oGeschaeft, callback) {
    //eliminate id because of autoincrement
    oGeschaeft.ges_id = 0;
    oGeschaeft.ges_besuche = 0;

    connection.query("INSERT into pm.Geschaeft SET ?", oGeschaeft, function (oError, aResult, oFields) {

        if (oError) {
            callback(oError, aResult);
        } else {
            //get entity
            connection.query('SELECT * from pm.Geschaeft where ges_id = ' + aResult.insertId, function (oError, aResult, oFields) {
                if (oError) {
                    callback(oError, aResult);
                } else {
                    callback(oError, aResult);
                }
            });
        }
    });

}



module.exports = Geschaeft;

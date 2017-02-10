// PurchaseManager.js
var Geschaeft = require('./Geschaeft.js');
var Zahler = require('./Zahler.js');
var Einkauf = require('./Einkauf.js');

var geschaeft = new Geschaeft();
var zahler = new Zahler();
var einkauf = new Einkauf();

var PurchaseManager = function () { };

/**
 * Geschaeft GetEntitySet
 */
PurchaseManager.prototype.getGeschaeftEntitySet = function(callback){
    geschaeft.getGeschaeftEntitySet(function (oError, aResults, oConnection) {
        if (oError === null) {
            callback(oError, aResults);
        } else {
            callback(oError, aResults);
        }
    });
};

/**
 * Geschaeft GetEntity
 */
PurchaseManager.prototype.getGeschaeftEntity = function(sGes_id, callback){
    geschaeft.getGeschaeftEntity(sGes_id, function (oError, aResult, oConnection) {
        if (oError === null) {
            callback(oError, aResult);
        } else {
            callback(oError, aResult);
        }
    });
};

/**
 * Geschaeft DeleteEntity
 */
PurchaseManager.prototype.deleteGeschaeftEntity = function(sGes_id, callback){
    geschaeft.deleteGeschaeftEntity(sGes_id, function (oError, aResult, oConnection) {
        if (oError === null) {
            callback(oError, aResult);
        } else {
            callback(oError);
        }
    });
};

/**
 * Geschaeft InsertEntity
 */
PurchaseManager.prototype.insertGeschaeftEntity = function(oGeschaeft, callback){
    geschaeft.insertGeschaeftEntity(oGeschaeft, function (oError, oResult, oConnection) {
        if (oError === null) {
            callback(oError, oResult);
        } else {
            callback(oError, oResult);
        }
    });
};

/**
 * Zahler GetEntitySet
 */
PurchaseManager.prototype.getZahlerEntitySet = function(callback){
    zahler.getZahlerEntitySet(function (oError, aResults, oConnection) {
        if (oError === null) {
            callback(oError, aResults);
        } else {
            callback(oError, aResults);
        }
    });
};

/**
 * Einkauf InsertEntity
 */
PurchaseManager.prototype.insertEinkaufEntity = function(oEinkauf, callback){
    einkauf.insertEinkaufEntity(oEinkauf, function (oError, oResult, oConnection) {
        if (oError === null) {
            callback(oError, oResult);
        } else {
            callback(oError, oResult);
        }
    });
};




module.exports = PurchaseManager;
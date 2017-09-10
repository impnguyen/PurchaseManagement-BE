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
    geschaeft.getGeschaeftEntitySet(function (oError, aResults) {
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
    geschaeft.getGeschaeftEntity(sGes_id, function (oError, aResult) {
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
    geschaeft.deleteGeschaeftEntity(sGes_id, function (oError, aResult) {
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
    geschaeft.insertGeschaeftEntity(oGeschaeft, function (oError, oResult) {
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
    zahler.getZahlerEntitySet(function (oError, aResults) {
        if (oError === null) {
            callback(oError, aResults);
        } else {
            callback(oError, aResults);
        }
    });
};

/**
 * Einkauf GetEntitySet
 */
PurchaseManager.prototype.getEinkaufEntitySet = function(callback){
    einkauf.getEinkaufEntitySet(function (oError, aResults) {
        if (oError === null) {
            callback(oError, aResults);
        } else {
            callback(oError, aResults);
        }
    });
};

/**
 * Einkauf GetEntitySet in date range (with startDate and endDate)
 */
PurchaseManager.prototype.getEinkaufEntitySetInRange = function(startDate, endDate, callback){
    einkauf.getEinkaufEntitySetInRange(startDate, endDate, function (oError, aResults) {
        if (oError === null) {
            callback(oError, aResults);
        } else {
            callback(oError, aResults);
        }
    });
};

/**
 * Einkauf GetEntitySet by geschaeft
 */
PurchaseManager.prototype.getEinkaufEntitySetByGeschaeft = function(gesId, callback){
    einkauf.getEinkaufEntitySetByGeschaeft(gesId, function(oError, aResults){
        if (oError === null) {
            callback(oError, aResults);
        } else {
            callback(oError, aResults);
        }
    })
};

/**
 * Einkauf InsertEntity
 */
PurchaseManager.prototype.insertEinkaufEntity = function(oEinkauf, callback){
    einkauf.insertEinkaufEntity(oEinkauf, function (oError, oResult) {
        if (oError === null) {
            callback(oError, oResult);
        } else {
            callback(oError, oResult);
        }
    });
};

/**
 * Einkauf DeleteEntity
 */
PurchaseManager.prototype.deleteEinkaufEntity = function(sEink_id, callback){
    einkauf.deleteEinkaufEntity(sEink_id, function (oError, aResult) {
        if (oError === null) {
            callback(oError, aResult);
        } else {
            callback(oError);
        }
    });
};




module.exports = PurchaseManager;

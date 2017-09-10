// PmMiddleware.js
var express = require('express');
var bodyParser = require('body-parser')
var Pm = require('./PurchaseManager.js');

var pm = new Pm();
var middleware = express();



//configure express
middleware.use(bodyParser.json());

// middleware options
middleware.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});





/**
 * Geschaeft Get Entity Set
 */
middleware.get('/GeschaeftEntitySet', function (req, res) {

    //get geschaefte entity set
    pm.getGeschaeftEntitySet(function (oError, aResults) {
        if (oError === null) {
            res.send({ 'results': aResults });
        } else {
            res.send(oError);
        }
    });

});

/**
 * Geschaeft: get entity
 */
middleware.get('/GeschaeftEntity/:ges_id', function (req, res) {
    //get geschaefte entity
    pm.getGeschaeftEntity(req.params.ges_id, function (oError, aResult) {
        if (oError === null) {
            res.send({ 'result': aResult });
        } else {
            res.send(oError);
        }
    });

});

/**
 * Geschaeft: del entity
 */
middleware.delete('/GeschaeftEntity/:ges_id', function (req, res) {

    //del geschaefte entity 
    pm.deleteGeschaeftEntity(req.params.ges_id, function (oError, aResult) {
        if (oError === null) {
            res.status(204);
            res.send('Entity deleted');
        } else {
            res.send(oError);
        }
    });

});

/**
 * Geschaeft: insert entity
 */
middleware.post('/GeschaeftEntity', function (req, res) {
    //get geschaefte entity
    pm.insertGeschaeftEntity(req.body, function (oError, oResult) {
        if (oError === null) {
            res.send({ 'result': oResult });
        } else {
            res.send(oError);
        }
    });

});

/**
 * Einkauf Get Entity Set
 */
middleware.get('/EinkaufEntitySet', function (req, res) {

    //get Einkauf entity set
    pm.getEinkaufEntitySet(function (oError, aResults) {
        if (oError === null) {
            res.send({ 'results': aResults });
        } else {
            res.send(oError);
        }
    });

});

/**
 * Einkauf GetEntitySet by Geschaeft
 */
middleware.get('/EinkaufEntitySet/byGeschaeft/:gesid', function (req, res) {
    
        //get Einkauf entity set
        pm.getEinkaufEntitySetByGeschaeft(req.params.gesid, function (oError, aResults) {
            if (oError === null) {
                res.send({ 'results': aResults });
            } else {
                res.send(oError);
            }
        });
    
});

/**
 * Einkauf Get Entity Set (optional. between two dates)
 */
middleware.post('/EinkaufEntitySet', function (req, res) {

    //check if start- and endDate exists
    if (req.body.startDate !== undefined && req.body.endDate) {
        //check date format
        if ( dateFormatIsValid(req.body.startDate) && dateFormatIsValid(req.body.endDate) ) {
            //get Einkauf entity set
            pm.getEinkaufEntitySetInRange(req.body.startDate, req.body.endDate, function (oError, aResults) {
                if (oError === null) {
                    res.send({ 'results': aResults });
                } else {
                    res.send(oError);
                }
            });
        }else{
            res.send({ 'error': 'no valid date (check for yyyy-MM-dd)' });
        }



    } else {
        //get Einkauf entity set
        pm.getEinkaufEntitySet(function (oError, aResults) {
            if (oError === null) {
                res.send({ 'results': aResults });
            } else {
                res.send(oError);
            }
        });
    }




});

/**
 * Einkauf: del entity
 */
middleware.delete('/EinkaufEntity/:eink_id', function (req, res) {

    //del geschaefte entity 
    pm.deleteEinkaufEntity(req.params.eink_id, function (oError, aResult) {
        if (oError === null) {
            res.status(204);
            res.send('Entity deleted');
        } else {
            res.send(oError);
        }
    });

});

/**
 * Zahler Get Entity Set
 */
middleware.get('/ZahlerEntitySet', function (req, res) {

    //get Zahler entity set
    pm.getZahlerEntitySet(function (oError, aResults) {
        if (oError === null) {
            res.send({ 'results': aResults });
        } else {
            res.send(oError);
        }
    });

});

/**
 * Einkauf: insert entity
 */
middleware.post('/EinkaufEntity', function (req, res) {
    //get einkauf entity
    pm.insertEinkaufEntity(req.body, function (oError, oResult) {
        if (oError === null) {
            res.send({ 'insertedId': oResult });
        } else {
            res.send(oError);
        }
    });

});


//port listener
middleware.listen(3000, function () {
    console.log('pm middleware listening on port 3000');
});


/**
 * util functions
 */

//check incoming string to given format: yyyy-MM-dd
function dateFormatIsValid(sDate) {
    //check string/date legnth
    if (sDate.length !== 10) {
        return false;
    }

    //check minus in date
    if (sDate.substring(4, 5) !== "-" || sDate.substring(7, 8) !== "-") {
        return false;
    }

    //check year
    if (!isNaN(sDate.substring(0, 4))) {
        //ok
    } else {
        return false;
    }

    //check month
    if (!isNaN(sDate.substring(5, 7))) {
        //ok
    } else {
        return false;
    }

    //check day
    if (!isNaN(sDate.substring(8, 11))) {
        //ok
    } else {
        return false;
    }

    return true;
}
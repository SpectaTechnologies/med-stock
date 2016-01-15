var router = require('express').Router()
var Stockist = require('../../models/stockist')
var config = require('../../../config')


router.use(function timeLog(req, res, next) {
    if (req.headers['x-auth'])
        console.log("hello from the other side" + req.auth.username)
    next();
});


//Save details for new product (CREATE)
router.post('/', function(req, res, next) {

    var stockist = new Stockist({
        user_id: req.auth.username,
        stockist_code: req.body.stockist_code,
        stockist_name: req.body.stockist_name,
        stockist_areacode: req.body.stockist_areacode,
        stockist_address: req.body.stockist_address,
        stockist_openingbalance: req.body.stockist_openingbalance,
        stockist_bstcode: req.body.stockist_bstcode

    })

    stockist.save(function(err, stockist) {
        if (err) {
            return res.status(500).send(err);
        }
        // res.send(201)
        res.json(stockist);

    })
})



router.get('/', function(req, res, next) {

    Stockist.find({
      user_id: req.auth.username
    }, function(err, stockist) {
        if (err) {
            return next(err)
        } else {
            console.log("this is the user list of stockists from stockist GET: " + stockist)
             
            res.json(stockist)
        }

    })


})


router.get('/count', function(req, res, next) {

    Stockist.count({
        user_id: req.auth.username
    }, function(err, count) {
        console.log("Count is :", count);
        res.json(count)
    })


})

module.exports = router

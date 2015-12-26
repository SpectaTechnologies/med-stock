var router = require('express').Router()
var Company = require('../../models/company')
var config = require('../../../config')


router.use(function timeLog(req, res, next) {
    if (req.headers['x-auth'])
        console.log("hello from the other side" + req.auth.username)
    next();
});


//Save details for new product (CREATE)
router.post('/', function(req, res, next) {

    var company = new Company({
        user_id: req.auth.username,
        company_code: req.body.company_code,
        company_name: req.body.company_name,
        company_areacode: req.body.company_areacode,
        company_address: req.body.company_address,
        company_openingbalance: req.body.company_openingbalance,
        company_bstcode: req.body.company_bstcode

    })

    company.save(function(err, company) {
        if (err) {
            return res.status(500).send(err);
        }
        // res.send(201)
        res.json(company);

    })
})



router.get('/', function(req, res, next) {

    Company.find({
        user_id: req.auth.username
    }, function(err, company) {
        if (err) {
            return next(err)
        }
        console.log("this is the user list of companies from Product GET: " + company)
            //console.log(vehicle)
        res.json(company)
    })


})


module.exports = router

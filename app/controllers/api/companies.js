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
        } else {
            console.log("this is the user list of companies from Product GET: " + company)

            res.json(company)
        }

    })


})

router.get('/count', function(req, res, next) {

    Company.count({
        user_id: req.auth.username
    }, function(err, count) {
        console.log("Count is :", count);
        res.json(count)
    })


})




router.get('/:_id', function(req, res, next) {

    Company.findOne({
        _id: req.params._id
    }, function(err, company) {
        if (err) {
            return next(err)
        }
        res.json(company)
    })


})


router.put('/:_id', function(req, res, next) {

    Company.findById(req.params._id, function(err, company) {
        if (err) {
            return next(err)
        }

        company.user_id = req.auth.username,
            company.company_code = req.body.company_code,
            company.company_name = req.body.company_name,
            company.company_areacode = req.body.company_areacode,
            company.company_address = req.body.company_address,
            company.company_openingbalance = req.body.company_openingbalance,
            company.company_bstcode = req.body.company_bstcode


        company.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Company updated!'
            });
        });
    })

});


router.delete('/:_id', function(req, res, next) {

    console.log(req.params._id)

    Company.findById(req.params._id, function(err, company) {
        if (err) {
            // handle error
        }

        company.remove(function(err) {
            if (err) {
                res.send(err)
            }
            res.json({
                message: 'Company Deleted'
            })
        }); //Removes the document
    })


});






module.exports = router

var router = require('express').Router()
var Product = require('../../models/products')
var config = require('../../../config')


router.use(function timeLog(req, res, next) {
    if (req.headers['x-auth'])
        console.log("hello from the other side" + req.auth.username)
    next();
});


//Save details for new product (CREATE)
router.post('/', function(req, res, next) {

    var product = new Product({
        user_id: req.auth.username,
        product_code: req.body.product_code,
        product_name: req.body.product_name,
        product_packing: req.body.product_packing,
        product_company: req.body.product_company,
        product_salestax: req.body.product_salestax,
        product_discount: req.body.product_discount,
        product_boxsize: req.body.product_boxsize,
        product_purchase: req.body.product_purchase,
        product_mrp: req.body.product_mrp


    })

    product.save(function(err, product) {
        if (err) {
            return res.status(500).send(err);
        }
        // res.send(201)
        res.json(product);

    })
})

//Get details for all the products (INDEX)
router.get('/', function(req, res, next) {

    Product.find({
        user_id: req.auth.username
    }, function(err, product) {
        if (err) {
            return next(err)
        }
        console.log("this is the user list of products from Product GET: " + product)
            //console.log(vehicle)
        res.json(product)
    })


})

//Get details for a specific product id (SHOW)
router.get('/:product_id', function(req, res, next) {

    Vehicle.findOne({
        device_id: req.params.vehicle_id
    }, function(err, vehicle) {
        if (err) {
            return next(err)
        }
        res.json(vehicle)
    })


})





module.exports = router

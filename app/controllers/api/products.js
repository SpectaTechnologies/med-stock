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
        product_product: req.body.product_company,
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

router.get('/:_id', function(req, res, next) {

    Product.findOne({
        _id: req.params._id
    }, function(err, product) {
        if (err) {
            return next(err)
        }
        res.json(product)
    })


})


router.put('/:_id', function(req, res, next) {

    Product.findById(req.params._id, function(err, product) {
        if (err) {
            return next(err)
        }

        product.user_id = req.auth.username,
            product.product_code = req.body.product_code,
            product.product_name = req.body.product_name,
            product.product_areacode = req.body.product_areacode,
            product.product_address = req.body.product_address,
            product.product_openingbalance = req.body.product_openingbalance,
            product.product_bstcode = req.body.product_bstcode


        product.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'product updated!'
            });
        });
    })

});


router.delete('/:_id', function(req, res, next) {

    console.log(req.params._id)

    product.findById(req.params._id, function(err, product) {
        if (err) {
            // handle error
        }

        product.remove(function(err){
            if(err){
                res.send(err)
            }
            res.json({
                message : 'product Deleted'
            })
        }); //Removes the document
    })


});




module.exports = router

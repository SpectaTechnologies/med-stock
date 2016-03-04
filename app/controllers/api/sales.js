var router = require('express').Router()
var Metadata = require('../../models/metadata')
var config = require('../../../config')



//Save details for new product (CREATE)
router.post('/billheader', function(req, res, next) {

    var metadata = new Metadata({
        user_id: req.auth.username,
        bill_header_title: req.body.bill_header_title,
        bill_header_subtitle:req.body.bill_header_subtitle
    })

    metadata.save(function(err, metadata) {
        if (err) {
            return res.status(500).send(err);
        }
        // res.send(201)
        res.json(metadata);

    })
})


router.get('/billheader', function(req, res, next) {

    Metadata.findOne({
        user_id: req.auth.username
    }, function(err, metadata) {
        if (err) {
            return next(err)
        }        
         
        res.json(metadata)
    })


})


module.exports = router

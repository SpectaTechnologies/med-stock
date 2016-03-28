var router = require('express').Router()
var Employee = require('../../models/employee')
var config = require('../../../config')


router.use(function timeLog(req, res, next) {
    if (req.headers['x-auth'])
        console.log("hello from the other side" + req.auth.username)
    next();
});


//Save details for new product (CREATE)
router.post('/', function(req, res, next) {

    var employee = new Employee({
        user_id: req.auth.username,
        employee_code: req.body.employee_code,
        employee_name: req.body.employee_name,
        employee_areacode: req.body.employee_areacode,
        employee_address: req.body.employee_address,
        employee_openingbalance: req.body.employee_openingbalance,
        employee_bstcode: req.body.employee_bstcode

    })

    employee.save(function(err, employee) {
        if (err) {
            return res.status(500).send(err);
        }
        // res.send(201)
        res.json(employee);

    })
})



router.get('/', function(req, res, next) {

    Employee.find({
      user_id: req.auth.username
    }, function(err, employee) {
        if (err) {
            return next(err)
        } else {
            console.log("this is the user list of employees from employee GET: " + employee)             
            res.json(employee)
        }

    })


})

router.get('/count', function(req, res, next) {

    Employee.count({
        user_id: req.auth.username
    }, function(err, count) {
        console.log("Count is :", count);
        res.json(count)
    })


})


router.get('/:_id', function(req, res, next) {

    Employee.findOne({
        _id: req.params._id
    }, function(err, employee) {
        if (err) {
            return next(err)
        }
        res.json(employee)
    })


})


router.put('/:_id', function(req, res, next) {

    Employee.findById(req.params._id, function(err, employee) {
        if (err) {
            return next(err)
        }

        employee.user_id = req.auth.username,
            employee.employee_code = req.body.employee_code,
            employee.employee_name = req.body.employee_name,
            employee.employee_areacode = req.body.employee_areacode,
            employee.employee_address = req.body.employee_address,
            employee.employee_openingbalance = req.body.employee_openingbalance,
            employee.employee_bstcode = req.body.employee_bstcode


        employee.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Employee updated!'
            });
        });
    })

});



router.delete('/:_id', function(req, res, next) {

    console.log(req.params._id)

    Employee.findById(req.params._id, function(err, employee) {
        if (err) {
            // handle error
        }

        employee.remove(function(err) {
            if (err) {
                res.send(err)
            }
            res.json({
                message: 'Employee Deleted'
            })
        }); //Removes the document
    })


});



module.exports = router

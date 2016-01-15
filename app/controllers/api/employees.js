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

module.exports = router

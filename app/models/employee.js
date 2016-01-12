var db = require('./db')
var employee = db.Schema({    
    user_id: {
        type: String,
        required: true
    },
    employee_code: {
        type: String,
        
    },
    employee_name: {
        type: String,
        
    },
    employee_areacode: {
        type: String,
        
    },
    employee_address: {
        type: String,
        
    },
    employee_openingbalance: {
        type: String
    },

    employee_bstcode: {
        type: String
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = db.model('employee', employee)

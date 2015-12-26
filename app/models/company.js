var db = require('./db')
var company = db.Schema({    
    user_id: {
        type: String,
        required: true
    },
    company_code: {
        type: String,
        
    },
    company_name: {
        type: String,
        
    },
    company_areacode: {
        type: String,
        
    },
    company_address: {
        type: String,
        
    },
    company_openingbalance: {
        type: String
    },

    company_bstcode: {
        type: String
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = db.model('company', company)

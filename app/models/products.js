var db = require('./db')
var products = db.Schema({
    /*product_id: {
        type: String,
        required: true
    },*/
    user_id: {
        type: String,
        required: true
    },
    product_code: {
        type: String,
        
    },
    product_name: {
        type: String,
        
    },
    product_packing: {
        type: String,
        
    },
    product_company: {
        type: String,
        
    },
    product_salestax: {
        type: String
    },

    product_discount: {
        type: String
    },

    product_boxsize: {
        type: String
    },

    product_purchase: {
        type: String
    },

    product_mrp: {
        type: String
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = db.model('products', products)

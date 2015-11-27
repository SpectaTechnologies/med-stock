var db = require('./db')
var products = db.Schema({
    product_id: {
        type: String,
        required: true
    },
    product_code: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_packing: {
        type: String,
        required: true
    },
    product_company: {
        type: Date,
        required: true,
        default: Date.now
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

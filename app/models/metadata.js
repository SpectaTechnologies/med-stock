var db = require('./db')
var metadata = db.Schema({    
    user_id: {
        type: String,
        required: true
    },
    bill_header_title: {
        type: String
    },
    bill_header_subtitle: {
        type: String
    }    
})

module.exports = db.model('metadata', metadata)

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds057204.mongolab.com:57204/heroku_12zn8pjr', function() {
    console.log('mongodb connected');
})
mongoose.connection.on('open', function(ref) {
    console.log('Connected to Mongo server...');
});

module.exports = mongoose;



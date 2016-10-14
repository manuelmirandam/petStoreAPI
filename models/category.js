var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoryModel = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('Category', categoryModel);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var animalModel = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('Animal', animalModel);
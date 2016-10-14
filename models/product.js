var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productModel = new Schema({
    name: {
        type: String
    },
    shortDescription: {
        type: String
    },
    largeDescription: {
        type: String
    },
    unitPrice: {
        type: Number
    },
    stock: {
        type: Number
    },
    imgPath: {
        type: String
    },
    animalId: {
        type: String
    },
    categoryId: {
        type: String
    }
});

module.exports = mongoose.model('Product', productModel);

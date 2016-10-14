var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartItemModel = new Schema({
    quantity: {
        type: Number
    },
    productId: {
        type: String
    },
    userId: {
        type: String
    }
});

module.exports = mongoose.model('CartItem', cartItemModel);

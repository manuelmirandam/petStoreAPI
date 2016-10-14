var express = require('express');

var routes = function (CartItem) {
    var cartItemRouter = express.Router();
    var cartItemController = require('../controllers/cartItemController')(CartItem);

    cartItemRouter
        .route('/')
        .post(cartItemController.post)
        .get(cartItemController.get);

    cartItemRouter.use('/:cartItemId', cartItemController.findCartItem);

    cartItemRouter
        .route('/:cartItemId')
        .get(cartItemController.getCartItem)
        .put(cartItemController.put)
        .delete(cartItemController.deleteCartItem);
            
    return cartItemRouter;
};

module.exports = routes;

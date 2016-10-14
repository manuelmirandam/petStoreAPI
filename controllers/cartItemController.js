var cartItemController = function (CartItem) {
    // Create the endpoint /api/cartitems for POST
    var post = function (req, res) {
        var cartItem = new CartItem(req.body);
        cartItem.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(cartItem);
            }
        });
    };

    // Create the endpoint /api/cartitems for GET
    var get = function (req, res) {
        var query = {};

        if (req.query.userId) {
            query.userId = req.query.userId;
        }
        
        if (req.query.productId) {
            query.productId = req.query.productId;
        }

        CartItem.find(query, function (err, cartItems) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(cartItems);
            }
        });
    };

    // Middleware for api/cartitems/:cartItemId
    var findCartItem = function (req, res, next) {
        CartItem.findById(req.params.cartItemId, function (err, cartItem) {
            if (err) {
                res.status(500).send(err);
            } else if (cartItem) {
                req.cartItem = cartItem;
                next();
            } else {
                res.status(404).send('Cart item not found');
            }
        });
    };
    
    // Create the endpoint for /api/cartitems/:cartItemId for GET
    var getCartItem = function (req, res) {
        return res.status(200).json(req.cartItem);
    };

    // Create the endpoint for /api/cartItems/:cartItemId for PUT
    var put = function (req, res) {
        req.cartItem.quantity = req.body.quantity;
        req.cartItem.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('The cart item has been updated successfully');
            }
        });
    };

    // Create the endpoint for /api/cartItems/:cartItemId for DELETE
    var deleteCartItem = function (req, res) {
        req.cartItem.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('The cart item has been deleted successfully');
            }
        });
    };       

    return {
        post: post,
        get: get,
        put: put,
        deleteCartItem: deleteCartItem,
        getCartItem: getCartItem,
        findCartItem: findCartItem        
    };

};


module.exports = cartItemController;

var express = require('express');

var routes = function (Product) {
    var productRouter = express.Router();
    var productController = require('../controllers/productController')(Product);

    productRouter
        .route('/')
        .post(productController.post)
        .get(productController.get);
    
    productRouter.use('/:productId', productController.findProduct);
    
    productRouter
        .route('/:productId')
        .get(productController.getProduct)
        .put(productController.put)
        .patch(productController.patch)
        .delete(productController.deleteProduct);

    return productRouter;
};

module.exports = routes;
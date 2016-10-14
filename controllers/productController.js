var productController = function (Product) {
    // Create the endpoint /api/products for POST
    var post = function (req, res) {
        var product = new Product(req.body);
        product.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(product);
            }
        });
    };

    // Create the endpoint /api/products for GET
    var get = function (req, res) {
        var query = {};
        if (req.query.categoryId) {
            query.categoryId = req.query.categoryId;
        }

        Product.find(query, function (err, products) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(products);
            }
        });
    };

    // Middleware for /api/products/:productId
    var findProduct = function (req, res, next) {
        Product.findById(req.params.productId, function (err, product) {
            if (err) {
                res.status(500).send(err);
            } else if (product) {
                req.product = product;
                next();
            } else {
                res.status(404).send('Product not found');
            }
        });
    };

    // Create the endpoint /api/products/:productId for GET
    var getProduct = function (req, res) {
        res.status(200).json(req.product);
    };

    // Create the endpoint /api/products/:productId for PUT
    var put = function (req, res) {
        req.product.name = req.body.name;
        req.product.shortDescription = req.body.shortDescription;
        req.product.largeDescription = req.body.largeDescription;
        req.product.unitPrice = req.body.unitPrice;
        req.product.stock = req.body.stock;
        req.product.imgPath = req.body.imgPath;
        req.product.animalId = req.body.animalId;
        req.product.categoryId = req.body.categoryId;
        req.product.save(function (err, product) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('The product has been updated successfully');
            }
        });
    };

    // Create the endpoint /api/products/:productId for PATCH
    var patch = function (req, res) {
        if (req.body._id) {
            delete req.body._id;
        }

        // We loop over the product properties and set the new values
        for (var p in req.body) {
            req.product[p] = req.body[p];
        }

        req.product.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.product);
            }
        });
    };

    // Create the endpoint /api/products/:productId for DELETE
    var deleteProduct = function (req, res) {
        req.product.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('The product has been removed successfully');
            }
        });
    };

    return {
        post: post,
        get: get,
        put: put,
        patch: patch,
        deleteProduct: deleteProduct,
        getProduct: getProduct,
        findProduct: findProduct
    };
};

module.exports = productController;

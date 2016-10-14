var categoryController = function (Category) {
    // Create the endpoint /api/categories for POST
    var post = function (req, res) {
        var category = new Category(req.body);
        category.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(category);
            }
        });
    };

    // Create the endpoint /api/categories for GET
    var get = function (req, res) {
        Category.find(function (err, categories) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(categories);
            }
        });
    };

    return {
        post: post,
        get: get
    };
};

module.exports = categoryController;

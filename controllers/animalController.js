var animalController = function (Animal) {
    // Create the endpoint /api/animals for POST
    var post = function (req, res) {
        var animal = new Animal(req.body);
        animal.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(animal);
            }
        });
    };

    // Create the endpoint /api/animals for GET
    var get = function (req, res) {
        Animal.find(function (err, animals) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(animals);
            }
        });
    };

    return {
        post: post,
        get: get
    };
};

module.exports = animalController;

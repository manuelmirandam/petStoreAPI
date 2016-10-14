var express = require('express');

var routes = function (Animal) {
    var animalRouter = express.Router();
    var animalController = require('../controllers/animalController')(Animal);

    animalRouter
        .route('/')
        .post(animalController.post)
        .get(animalController.get);

    return animalRouter;
};

module.exports = routes;

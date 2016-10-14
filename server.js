var express = require('express');

// DB Settings
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/petstoreAPI');
mongoose.Promise = require('q').Promise;

// Models
var Animal = require('./models/animal');
var Category = require('./models/category');
var Product = require('./models/product');
var CartItem = require('./models/cartItem');

// Routers
var animalRouter = require('./routes/animalRoutes')(Animal);
var categoryRouter = require('./routes/categoryRoutes')(Category);
var productRouter = require('./routes/productRoutes')(Product);
var cartItemRouter = require('./routes/cartItemRoutes')(CartItem);

// App settings
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var baseUrl = '/api/';

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(baseUrl + 'animals', animalRouter);
app.use(baseUrl + 'categories', categoryRouter);
app.use(baseUrl + 'products', productRouter);
app.use(baseUrl + 'cartItems', cartItemRouter);

app.get('/', function (req, res) {
    res.send('welcome to petStore API');
});

app.listen(port, function () {
    console.log('Gulp is running on port ' + port);
});

module.exports = app;
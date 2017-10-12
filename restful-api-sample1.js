/*
#Build a RESTful API in 5 Minutes with NodeJS - Updated - YouTube
#https://www.youtube.com/watch?v=p-x6WdwaJco
#========================================================
1) Check for installers:
$ node -v
$ npm -v
$ mongo

#========================================================
2) Creste workspace
$ mkdir rest
$ cd rest

#========================================================
3) Initialize package
$ npm init
#use default values quickly by enter
$ subl . #this is to open files in dir in sublime

#========================================================
4) Install express library
$ npm install express --save

#========================================================
5) Create server.js on the same dir with contests below for quick test
*/
//--------------------------------
var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('working');
});

app.listen(3000);
console.log('API is running!');
//--------------------------------
/*
#========================================================
6) Run ./server.js to quickly test
$ node server.js
#this will show the console.log

#========================================================
7) Install all other libraries
$ npm install --save mongoose node-restful body-parser

#========================================================
8) Install nodemon for automatic restart of the server
$ sudo npm install -g nodemon

#========================================================
9) Test run ./server.js with nodemon
$ nodemon server.js
#try editing the server.js and it will auto restart

#========================================================
10) Now, let's add more functions as below to ./server.js
*/
//--------------------------------
//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//MongoDB
mongoose.connect('mongodb://localhost/rest_test');

//Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Routes 
app.use('/api', require('./routes/api'));

//Start server
app.listen(3000);
console.log('API is running!');
//--------------------------------

//#========================================================
//11) Now, let's add routes as ./routes/api.js and test if working
//--------------------------------
//Dependencies
var express = require('express');
var router = express.Router();

//Routes
router.get('/products', function(req, res){
	res.send('api is working');
})

//Return router
module.exports = router;
//--------------------------------

//#========================================================
//12) Now, let's add product database schema at ./models/product.js
//--------------------------------
//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema database
var productSchema = new mongoose.Schema({
	name: String,
	sku: String,
	price: Number,
});

//Return models
module.exports = restful.model('Products', productSchema);
//--------------------------------

//#========================================================
//13) Next, is to update ./routes/api.js based on our product and then try run the app
//--------------------------------
//Dependencies
var express = require('express');
var router = express.Router();

//Models
var Product = require('../models/product')

//Routes
Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/produkto');

//Return router
module.exports = router;
//--------------------------------
/*
#========================================================
14) Use POSTMAN for testing
#test GET
#test POST
{
	"name": "My product",
	"sku": "ASDF1234",
	"price": 32.50
}
#test PUT http://localhost:3000/api/produkto/
{
	"name": "Cool product",
}
#test DELETE http://localhost:3000/api/produkto/59dee2ece8486918122b3045
*/

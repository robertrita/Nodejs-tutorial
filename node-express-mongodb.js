/*
#Using Node.js & Express.js to save data to MongoDB Database
#https://medium.com/@ratracegrad/hitchhikers-guide-to-back-end-development-with-examples-3f97c70e0073
#https://github.com/jenniferbland/node-mongo-demo
[node-demo]
[node-demo]/[node_modules]
[node-demo]/app.js
[node-demo]/index.html
[node-demo]/package.json

#========================================================
1) Check for installers:
$ node -v
$ npm -v
$ mongo

#========================================================
2) Creste workspace
$ mkdir node-demo
$ cd node-demo

#========================================================
3) Initialize package
$ npm init
#use default values quickly by enter
$ subl . #this is to open files in dir in sublime

#========================================================
4) Install express library
$ npm install express --save

#========================================================
5) Create app.js(node.js server) on the same dir with contests below for quick test
*/
//$ touch app.js
//--------------------------------
//Dependencies
var express = require('express');
var app = express();
var port = 3000;

//listen to requests from the browser and 
//will return the text “Hello World” back to the browser
app.get('/', (req, res) => {
	res.send('Hello World');
});

//starts the server and tells it to listen on port 3000
app.listen(port, () => {
	console.log('Server listening on port ' +port);
});
//--------------------------------
/*
#========================================================
6) Now, let's create a web page to save data on mongoDB
$ touch index.html
--------------------------------
<!DOCTYPE html>
<html>
<head>
	<title>Intro to Node and MongoDB</title>
</head>

<body>
<h1>Intro to Node and MongoDB</h1>
<form method="post" action="/addname">
<label>Enter Your Name</label><br>
<input type="text" name="firstName" placeholder="Enter first name..." required>
<input type="text" name="lastName" placeholder="Enter last name..." required>
<input type="submit" value="Add Name">
</form>
</body>
</html>
--------------------------------
*/
//#========================================================
//7) Let's update app.js(node.js server) based on the web page we created
//--------------------------------
//Dependencies
var express = require('express');
var app = express();
var port = 3000;

//listen to requests from the browser and 
//will return the text “Hello World” back to the browser
app.use('/', (req, res) => {
	//res.send('Hello World');
	//sendFile command to show the index.html
	//node global call __dirname, provide the current directly where the command was run
	res.sendFile(__dirname + '/index.html');
});

//starts the server and tells it to listen on port 3000
app.listen(port, () => {
	console.log('Server listening on port ' +port);
});
//--------------------------------

//#========================================================
//8) Let's add mongoDB database support and create endpoint on app.js
//$ npm install --save mongoose body-parser
//--------------------------------
//Dependencies
var express = require('express');
var app = express();
var port = 3000;
//pass data for firstName and lastName in the body to the server
//convert data to json
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//MongoDB, by default, runs on port 27017
//connect to the database by telling it the location of the database
//and the name of the database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-demo');

//Schema is the format of the data in the database
var nameSchema = new mongoose.Schema({
	firstName: String,
	lastName: String
});

//create a model from Schema
var User = mongoose.model('User', nameSchema);

//listen to requests from the browser and 
//will return the text “Hello World” back to the browser
app.get('/', (req, res) => {
	//res.send('Hello World');
	//sendFile command to show the index.html
	//node global call __dirname, provide the current directly where the command was run
	res.sendFile(__dirname + '/index.html');
});

//To save the data into the database, we need to create a new instance of our model
//pass into this instance the user’s input, then enter the command “save”
//A promise is what is returned when the save to the database completes
//successful it will return to the .then segment of the promise
//fails it will return to the .catch segment of the promise
app.post('/addname', (req, res) => {
	var myData = new User(req.body);
	myData.save()
		.then(item => {
			res.send('item saved to database');
		})
		.catch(err => {
			res.status(400).send('unable to save to database');
		});
});

//starts the server and tells it to listen on port 3000
app.listen(port, () => {
	console.log('Server listening on port ' +port);
});
//--------------------------------

//#========================================================
//9) Lastly, test in the browser http://localhost:3000
//#You should get "item saved to database"

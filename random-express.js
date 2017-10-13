/*
#Add Serverside Logic to your Bot with just 10 lines of Javascript
#https://community.chatfuel.com/t/add-serverside-logic-to-your-bot-with-just-10-lines-of-javascript/3543
[random-gen]
[random-gen]/[node_modules]
[random-gen]/server.js
[random-gen]/package.json
#========================================================
1) Check for installers:
$ node -v
$ npm -v
$ mongo
#========================================================
2) Creste workspace
$ mkdir random-gen
$ cd random-gen
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
//Depaendencies
var express = require('express');
var app = express();
var port = 3000; //80 for the digitalocean server

//GET method verb
app.get('/*', function(req, res) {
	var jsonResponse = [];
	//push this response
	jsonResponse.push({
		"text": "Hi, " + (Math.random() * 5 + 1).toFixed(0) + " is a lucky number for you. :)"
	});
	res.send(jsonResponse);
})

//start listening to the client
app.listen(port, function() {
	console.log('Chatfuel Bot-Server listening on port ' +port);
});
//--------------------------------

//#========================================================
//6) Run ./server.js to quickly test
//$ node server.js
//#this will show the console.log

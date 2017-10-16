'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const restService = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Promise = require('promise');
var firebase = require('firebase');
var Nexmo = require('nexmo');

var app = firebase.initializeApp({
    ServiceAccount: {
       projectId: "copycat-a727c",
       clientEmail: "isang.puntos@gmail.com",
       privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC99n7ey2K88nmm\nCmzPM65PGAP9ko/GeMuo9OG5HtRgqKPxbSfsI7jqp9m/QdGaNu38GP5A9gayBcMz\nwoeB7Ny7AHJxXf8XQwnSpaafHXFVo3Mr1aiShE/WzGRKFZE6nRmHrMri4Li+xAtP\nyMWcz6gnr//eytgMfy+VwdAdX4raFaashd5edJ3S/c4zH29rGb9DLYDGNkl6XKGL\n5vh23yw5FnAXGHSOY/GSVo+pB/MnUZQETZw7Z+LdI9PMO+4O53VKu/neACQZncQB\nclj8k3sFLMya4EEq+DWpAr94wLV8z5iCUQv0dfOpPXo5A6+S+dRYwVfJ8L5Mbt63\nstOunagvAgMBAAECggEAQFMnwum8FZ9F8iO1lLQ7Yi0PrN3kMaDV1fCWPslhwRlZ\n6na7/gpao5sS8OCoyT+wdp0/+19UBRROdUh5+lTqqagNGLZrmsTonpvZQCgIKKeg\naEeBPZvwLRwpGa0T8HUiH/8y9ICEDpTz/6BMyjzHBClky1yErDalNmDayBeCPTZh\nLB9f81W+1polFoFZFJkFLCw/S/5nn/2VlCYCatRfsnSFBWNQ8UyGzztzqdmBkpGM\nbWBX8mHZmOODJ4s7VbdRmZo9noPtAF41B6tYXGaT+9R4uXlASJJ4pSrduTSpYi7h\nfGyPNCM8h21BzUzBqBjuj8R+m5fW2tA2OHpTzuSmAQKBgQD5jsNiRColIhb8DdTA\n50Qi22f7o7bOgVZMAVl6P32R0Y3jyHY4YSmJIpozctgZlgdDEdp4Owk2xb8457ok\nPSNznyF1soeUQrrY3JbZTUHew8f4xuBG8zZ48iNYqscDwt4H2arNuCNXIhS3XIi0\nIPwxLtAp2U4LGrkGKiElhTincQKBgQDC3eROe35+0vGTYk98PjoW5o4zdZTZTpsI\nvVxSR1xQUAtSm1GwZzZwPMSh6xlikIQZOBH+r8ipkW2ClhU6NlOEtILO0e+pcfs4\nOhQpZpwsMWxXorJYU/bhK9mlgwMT1tNwCzucixs7gVMbJiQPsS0uC6Mf6VznZa2H\nPdP78b25nwKBgC6T/tOwdU1I95FD45m9kHIREW9eNxiD+19kQRcYEo/M1PbWy3nq\naJ433yALJ1pfLivOgUA/hJC8h9xPI+bvolZKNSyKjdOWQNmJEn6sdMbnM8OzGtkj\nO9+HEiHSfiKtlFNSxRZwb+grbEJs+vbj0S481o15CZ/49N+5rUYbf1+BAoGAfIKx\nRWBtE/YO+4A+j4FnNoi8Za8Em9E5CF2OJtiH6J0sjuzFRnS8ePyrG1aP0sXKUh7c\niKKjEY3lriHdkGNz/AAm8KV9gARfY67ggQ+aTDaMJnbDg+KqhXeySqoqhjumwBm9\nTiooDV51zowRUKGB38D5ywMeJJB4T0i3MW1mL7sCgYBvqgQXdODsY3tJn2pUQyr+\ncjgN6juelqrbr34FWorgCA3IPA9sh5kKiZXBzNlnyN6Ki/me+dL5d8jy4ClfdMni\nOlibtLRPLWaLa04+6xojH4R/CDdk8Mhj67ghwRFyaNanYOrSWb3j0YgZpdag1QDf\nSChEBuPN1NdqpRL4dtIrUQ==\n-----END PRIVATE KEY-----\n"
    },
   databaseURL: "copycat-a727c.firebaseio.com"
});

var nexmo = new Nexmo({
    apiKey: '0d015ab6',
    apiSecret: '2bd6d40b997174c1'
  });

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/webhook', function(req, res) {
    console.log("REQUEST!!!!");
	var sampleResponse = {
						 "messages": [
							{
							  "attachment":{
								"type":"template",
								"payload":{
								  "template_type":"generic",
								  "elements":[
									{
									  "title":"Chatfuel Rockets T-Shirt",
									  "image_url":"https://rockets.chatfuel.com/img/shirt.png",
									  "subtitle":"Soft white cotton t-shirt with CF Rockets logo",
									  "buttons":[
										{
										  "type":"web_url",
										  "url":"https://rockets.chatfuel.com/store/shirt",
										  "title":"View Item"
										}
									  ]
									},
									{
									  "title":"Chatfuel Rockets Hoodie",
									  "image_url":"https://rockets.chatfuel.com/img/hoodie.png",
									  "subtitle":"Soft grey cotton hoddie with CF Rockets logo",
									  "buttons":[
										{
										  "type":"web_url",
										  "url":"https://rockets.chatfuel.com/store/hoodie",
										  "title":"View Item"
										}
									  ]
									}
								  ]
								}
							  }
							}
						  ]
						};
		console.log(sampleResponse);
		res.send(sampleResponse);
	
});

function makeRequest (method, url, commandString) { 
    return new Promise((resolve, reject) => {
        var postData = {
                "api_key":"4CFZ1SDPFO5PG9HM",
                "command_string": commandString
               };
        var async = true;
        var status = 0;

        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var request = new XMLHttpRequest();

        request.onreadystatechange = (function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve(request.responseText);
            } else {
                reject({status: this.status,statusText: request.statusText});
            };
        });
        request.open(method, url, false);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(postData));
        
    });
}

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});

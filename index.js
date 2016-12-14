var express = require("express");
var body = require("body-parser");
var fs = require("fs");
var app = express();
var http = require("http");
var server = http.createServer(app);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 2000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost'
 



var data = [{
		"name":"ankush",
		"age":"23",
		"company":"ClickLabs"
	},{
		"name":"tushar",
		"age":"23",
		"company":"ClickLabs"
	},{
		"name":"Rohan",
		"age":"24",
		"company":"Infogain"
	},{
		"name":"Gurmanjot",
		"age":"23",
		"company":"Infogain"
	},
	{
		"name":"Reema",
		"age":"23",
		"company":"Netsolution"
	}];

app.use(body.json());

app.use(body.urlencoded({extended: false }));

app.use(function(req,res,next){
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

app.use(express.static("./public"));

app.get("/",function(req,res){
	res.send("welcome");
})

app.post("/data-api",function(req,res){
	var result = data.filter(function(student){
		return student.name.toLowerCase() === req.body.name.toLowerCase();
	});
	res.send(`</!DOCTYPE html>
				<html>
				<head>
					<title>My data</title>
				</head>
				<body>
				<img src="/images/${result[0].name.toLowerCase()}.jpg"">
				<h1>name: ${result[0].name}</h1>
				<h1>age: ${result[0].age}</h1>
				<h1>company: ${result[0].company}</h1>
				</body>
				</html>`);
});

server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});


module.export = app;
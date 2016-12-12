var express = require("express");
var body = require("body-parser");
var fs = require("fs");
var app = express();

var data = [{
		"name":"Amit",
		"class":"10th",
		"present":"N"
	},{
		"name":"Rohan",
		"class":"11th",
		"present":"Y"
	},{
		"name":"Lack",
		"class":"9th",
		"present":"N"
	}];

app.use(body.json());

app.use(body.urlencoded({extended: false }));

app.use(function(req,res,next){
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

app.use(express.static("./public"));

app.next("/",function(req,res){
	res.send("Welcome");
})

app.post("/data-api",function(req,res){
	var result = data.filter(function(student){
		return student.name.toLowerCase() === req.body.name.toLowerCase();
	});
	var name = result[0].name;
	res.send(`</!DOCTYPE html>
				<html>
				<head>
					<title>My data</title>
				</head>
				<body>
				<img src="${result[0].name}.jpg"">
				<h1>${result[0].name}</h1>
				<h1>${result[0].class}</h1>
				<h1>${result[0].present}</h1>
				</body>
				</html>`);
});

app.listen(2000);

console.log("Server up!! @2000");

module.export = app;
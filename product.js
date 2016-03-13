var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongodb = require("mongodb");
var mongoose = require("mongoose");

var dbUrl = 'mongodb://localhost:27017/demodb';
mongoose.connect(dbUrl);

var Schema = mongoose.Schema;

// Define Product Schema
var ProductSchema = new Schema ( {
	productid: Number,  
    name: String,  
    description: String,  
    color: String, 
    modified: Date
});

// Get Product Model
var ProductModel = mongoose.model("Product", ProductSchema,"demodb.products");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use (function (req, resp, next) {
	console.log(`Request Method: ${req.method}, and request url is ${req.url}`);
	next();
});

// Get all Products
app.get('/products', function(req, resp) {
	console.log("get all products");
	resp.set({'Content-Type': 'application/json'});
	ProductModel.find(function(err, products) {
		if (!err) {
			//console.log(JSON.stringify(products));
			resp.json(products);
		}
		else {
			conolse.log(err);
		}
	});
});

// Get a Product by Id
app.get('/products/:id', function(req, resp) {
	console.log("get product by id");
	resp.set({'Content-Type': 'application/json'});
	ProductModel.findById(req.params.id, function(err, product) {
		if (!err) {
    		resp.json(product);
    	} 
   		else {
    		console.log(err);
    		resp.status(500).send();
    	}
	});
});

// Create a Product - POST API
app.post('/products', function(req,resp) {
	console.log("Create Product - POST");
	resp.set({'Content-Type': 'application/json'});
	var product = new ProductModel({
    	productid: req.body.productid,  
   		name: req.body.name,  
    	description: req.body.description,  
    	color: req.body.color, 
    	modified: new Date()
  	});
	product.save(function(err) {
		if (!err) {
			resp.status(201);
	    	resp.json(product);
	    } 
	    else {
	    	return console.log(err);
	    }
	});
});

// Update a Product by Id - PUT API
app.put('/products/:id', function(req,resp) {
	console.log("Update a Product - PUT");
	ProductModel.findById(req.params.id, function(err, product) {
		product.productid = req.body.productid; 
   		product.name = req.body.name;
    	product.description = req.body.description;
    	product.color = req.body.color;
    	product.modified = new Date();
    	product.save(function(err) {
			if (!err) {
		    	resp.json(product);
		    } 
		    else {
		    	return console.log(err);
		    }
	    });
	});
});

// Delete a Product By Id - DELETE API
app.delete('/products/:id', function(req,resp) {
	console.log("in delete");
	resp.set({'Content-Type': 'application/json'});
	ProductModel.findById(req.params.id, function(err, product) {
		product.remove(function(err) {
			if (!err) {
				resp.status(204);
		    	resp.send();
		    } 
		    else {
		    	return console.log(err);
		    }
		});
	});
});


app.listen(3000);
console.log("Web Server is runnning");
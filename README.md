# nodejs
Node.js prototypes

1. This is a sample Node.js application with RESTful APIs for the basic CRUD operations on a sample Product resource
2. Refer to the dependencies listed in package.json before running this application
3. This application connects to the mongodb database called "demodb". Modify the dbUrl variable in demo.js to specify your own db url
4. "products" is the collection name in the demodb and it has the following attributes:
	 (a) productid - Number
	 (b) name - String
	 (c) description - String
	 (d) color - String
	 (e) modified - Date
5. The supported RESTful APIs are:
	(a) GET all products (GET) - http://localhost:3000/products

		curl: curl -H "Content-Type: application/json" http://localhost:3000/products

	(b) GET a product by id (GET - http://localhost:3000/products/56caa79338b4ca001e8677f5
		curl: curl -H "Content-Type: application/json" http://localhost:3000/products/56caa79338b4ca001e8677f5

	(c) Create a product (POST) - http://localhost:3000/products
		JSON Payload: {"productid":105, "name":"phone 3G", "description":"phone 3G 32GB", "color": "Silver"}
		curl: curl -H "Content-Type: application/json" -X POST -d '{"productid":105, "name":"phone 3G", "description":"phone 3G 32GB", "color": "Silver"}' http://localhost:3000/products

	(d) Update a Product (PUT) - http://localhost:3000/products/56caa79338b4ca001e8677f5
		JSON Payload: {"productid":105, "name":"phone 3G Black", "description":"phone 3G 64GB", "color": "Black"}
		curl: curl -H "Content-Type: application/json" -X PUT -d '{"productid":105, "name":"phone 3G Black", "description":"phone 3G 64GB", "color": "Black"}' http://localhost:3000/products/56caa79338b4ca001e8677f5

	(e) Delete a Product (DELETE) - http://localhost:3000/products/56caa79338b4ca001e8677f5

// requirements
const http = require('http');
var pjson = require('./package.json');

// constants
const PORT = process.env.PORT || 8080;

// create server
var server = http.createServer( (req, res) => {
	if (req.url === "/") {
		// => home url
		res.writeHead(	// write header
			200, // status-code
			{
				"Content-Type": "application/json" // json content type
			}
		);
		var welcome = {
			'author': pjson.author,
			'bugs': pjson.bugs.url,
			'license': pjson.license,
			'message': 'Welcome to Couple-Box API !',
			'name': pjson.name,
			'repository': pjson.repository.url,
			'version': pjson.version
		}
		res.write(JSON.stringify(welcome, null, 3));
		res.end(); // end the response
	}
	else {
		// => not found
		res.writeHead(	// write header
			404, // status-code
			{
				"Content-Type": "application/json" // json content type
			}
		);
		var error = {
			'advisor': [
				'Review the url you entered',
				'URL was: ' + req.url,
				'Come back to API home at \'' + ('localhost' || server.address().host) + ":" + server.address().port + "/\'"
			],
			'code': 404,
			'error': 'Page not found',
			'message': 'Couple-Box API do not serve the page you asked for !'
		}
		res.write(JSON.stringify(error, null, 3));
		res.end(); // end the response
	}
} )

// make server listening
server.listen(PORT, () => {
	console.log("Server is listening on port " + PORT); // log
} )

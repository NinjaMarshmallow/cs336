const express = require('express');

const http_status = require('http-status-codes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

let dataStorage = [];

// Add Static Files
app.use('/', express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send("Welcome to lab07!")
})

// Hello path GET handler sends the passed name back to the client with a Hello prefix and ! suffix
app.get('/hello', (req, res) => {
	try {
		res.send({"result":"Hello, " + req.query.name + "!"});
	} catch (exception) {
		console.log(exception)
		res.send("You must send data in JSON format...")
	}
});


// Add a non-default 404 response for any urls that don't fit any above
app.get('*', (req, res) => res.send("404 Error - The page you are looking for doesn't exist :/\nTry going to /request."));

app.listen(port, () => console.log(`Listening on port ${port}!`))

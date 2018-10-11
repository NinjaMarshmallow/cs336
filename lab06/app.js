const express = require('express');

const http_status = require('http-status-codes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

let dataStorage = [];

// Add Static Files
// Adds the static forms/index.html
app.use('/', express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add Initial Welcome Message
app.get('/', (req, res) => res.send('This is lab06. Go to /request'));

// Add GET Handler
app.get('/request', (req, res) => res.send('Request Handler for GET!\n'));

// Add HEAD Handler
app.head('/request', (req, res) => res.send("This is the Header!\n"));

// Add PUT Handler that stores the given JSON object into dataStorage
app.put('/request', (req, res) => {
	res.send("Data received from PUT!\n");
	dataStorage.push(req.body);
	console.log("Storing Data Object: " + JSON.stringify(req.body));
	console.log("Database: " + dataStorage.toString());
});

// Add POST Handler that stores the given JSON object into dataStorage
app.post('/request', (req, res) => {
	res.send("Data received from POST!\n");
	dataStorage.push(req.body);
	console.log("Storing Data Object: " + JSON.stringify(req.body));
	console.log("Database: " + dataStorage.toString());
});

// Add DELETE Handler that deletes the given JSON object from dataStorage
app.delete('/request', (req, res) => {
	dataStorage.forEach(data => {
		if(JSON.stringify(data) == JSON.stringify(req.body)) {
			dataStorage.pop(data);
		}
	})
	console.log("Database: " + dataStorage.toString());
	res.send("Data has been deleted!\n")
});


// Add the forms POST Handler
app.post('/forms', function(req, res) {
    res.send('The message --' + req.body.user_message + '-- has been received from ' + req.body.user_name + ' at ' + req.body.user_mail);
});


// Add a non-default 404 response for any urls that don't fit any above
app.get('*', (req, res) => res.send("404 Error - The page you are looking for doesn't exist :/\nTry going to /request."));

app.listen(port, () => console.log(`Listening on port ${port}!`))

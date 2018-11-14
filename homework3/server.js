const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let dataStorage = [];
app.set('port', 3000);

// MongoDB variables
var username = 'cs336'
var password = process.env.MONGO_PASSWORD
var host = 'ds253713.mlab.com'
var port = '53713'
var database = 'cs336-jwk24'
var cs336DB = null;


var mclient = require('mongodb').MongoClient

mclient.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, function (err, client) {
    if (err) throw err

    cs336DB = client.db(database)
    
    app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
})

//Parameters: Person Object
//Returns: Number of years rounded down since the given person's hire date
function getSeniority(person) {
	var start = new Date(Date.parse(person.startDate));
	var now = new Date(Date.now());
	var years = now.getFullYear() - start.getFullYear();
	return person.firstName + " " + person.lastName + " has worked at the company for " + years + " years."
}

function printPerson(person) {
	return '<br>' + "First Name:\t" + person.firstName + '<br>'
		+  "Last Name:\t" + person.lastName + '<br>'
		+  "loginID:\t" + person.loginID + '<br>'
		+  "startDate:\t" + person.startDate + '<br><br>'
}

// Add people directory
app.get('/api/people', (req, res) => {
	cs336DB.collection("homework3").find().toArray((err, result) => {
        if (err) throw err
        res.json(result)
    })
});

app.put('/api/people', (req, res) => {
	cs336DB.collection("homework3").update(req.body);
})

// Add new people from a form post to the people list
app.post('/api/people', (req, res) => {
	cs336DB.collection("homework3").insert(req.body);	
});

app.delete('/api/people', (req, res) => {
	cs336.collection("homework3").delete(req.body)
})

// Add Catch for invalid employees from getPerson and respond for newly added people
// Can't figure out how to create more routes after app.listen is called
app.get('/api/people/*', (req, res) => {
	var loginID = req.path.replace("/people/", "");
	var person = cs336.collection("homework3").find({loginID: loginID});
	if(person) {
		res.send(printPerson(person));
	} else {
		res.send("Sorry, that person is not a current employee.")
	}
});

// Add 404 response for any urls that don't fit any above
app.get('*', (req, res) => res.send("404 Error - The page you are looking for doesn't exist :/"));

app.listen(port, () => console.log(`Listening on port ${port}!`))

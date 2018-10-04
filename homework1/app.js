const express = require('express');
const app = express();
const port = 3000;

var people = [
		{
			firstName: "Tyler",
			lastName: "Johnson",
			loginID: "tsj4",
			startDate: "5/18/2010"
		},
		{
			firstName: "Addison",
			lastName: "Smith",
			loginID: "als4",
			startDate: "6/3/2015"
		},
		{
			firstName: "Caleb",
			lastName: "Ferguson",
			loginID: "cjf28",
			startDate: "6/3/2015"
		},
		{
			firstName: "Emma",
			lastName: "Schroer",
			loginID: "ees32",
			startDate: "3/21/2013"
		},
		{
			firstName: "Michelle",
			lastName: "Koetje",
			loginID: "mnk6",
			startDate: "11/23/2011"
		},
		{
			firstName: "Fred",
			lastName: "McWain",
			loginID: "fcm2",
			startDate: "1/13/2012"
		},
		{
			firstName: "Lindy",
			lastName: "Anderson",
			loginID: "lca5",
			startDate: "4/4/2012"
		},
		{
			firstName: "Sarah",
			lastName: "Ball",
			loginID: "sab49",
			startDate: "12/5/2009"
		},
		{
			firstName: "Ryan",
			lastName: "VanAppledorn",
			loginID: "rav35",
			startDate: "7/31/2014"
		},
		{
			firstName: "Jena",
			lastName: "Gaffner",
			loginID: "jjg33",
			startDate: "10/15/2011"
		},
		{
			firstName: "Leah",
			lastName: "Bishop",
			loginID: "lmb57",
			startDate: "7/31/2016"
		},
		{
			firstName: "Jason",
			lastName: "Klaassen",
			loginID: "jwk24",
			startDate: "3/12/2010"
		},
		{
			firstName: "Al",
			lastName: "Hoekstra",
			loginID: "arl1",
			startDate: "2/7/1981"
		},
];

//Parameters: Person Object
//Returns: Number of years rounded down since the given person's hire date
function getSeniority(person) {
	var start = new Date(Date.parse(person.startDate));
	var now = new Date(Date.now());
	var years = now.getFullYear() - start.getFullYear();
	return person.firstName + " " + person.lastName + " has worked at the company for " + years + " years."
}

function printPerson(person) {
	return '<br>' + "First Name: " + person.firstName + '<br>'
		+  "Last Name: " + person.lastName + '<br>'
		+  "loginID: " + person.loginID + '<br>'
		+  "startDate: " + person.startDate + '<br><br>'
}
// Add Static Files
app.use('/', express.static('public'))

// Add Initial Welcome Message
app.get('/', (req, res) => res.send('This is homework1. Go to /people for the homework contents'))

// Add people directory
app.get('/people', (req, res) => res.send(people))

// Add all people pages for the whole record at /people/loginID
people.forEach(person => app.get('/people/' + person.loginID, (req, res) => res.send(printPerson(person))))
// Add all people pages for the name at /people/loginID/name
people.forEach(person => app.get('/people/' + person.loginID + "/name", (req, res) => res.send(person.firstName + " " + person.lastName)))
// Add all people pages for seniority at /people/loginID/years
people.forEach(person => app.get('/people/' + person.loginID + "/years/", (req, res) => res.send(getSeniority(person))))

// Add 404 response for any urls that don't fit any above
app.get('*', (req, res) => res.send("404 Error - The page you are looking for doesn't exist :/"));

app.listen(port, () => console.log(`Listening on port ${port}!`))

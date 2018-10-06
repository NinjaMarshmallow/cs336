const express = require('express');
const app = express();
const port = 3000;

// Add Static Files
app.use('/', express.static('public'))

// Add Initial Welcome Message
app.get('/', (req, res) => res.send('This is lab05.'))


// Add 404 response for any urls that don't fit any above
app.get('*', (req, res) => res.send("404 Error - The page you are looking for doesn't exist :/"));

app.listen(port, () => console.log(`Listening on port ${port}!`))

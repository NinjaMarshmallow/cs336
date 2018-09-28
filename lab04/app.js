const express = require('express')
const app = express()
const port = 3000

app.use('/', express.static('public'))

app.get('/', (req, res) => res.send('This is lab04. The exercise told me to make "doc1-3.html". They are served as static files.'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

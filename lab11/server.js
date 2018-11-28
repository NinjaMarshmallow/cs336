/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// MongoDB variables
var username = 'cs336'
var password = process.env.MONGO_PASSWORD
var host = 'ds253713.mlab.com'
var port = '53713'
var database = 'cs336-jwk24'
var commentsDB = null;

var mclient = require('mongodb').MongoClient

mclient.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, function (err, client) {
    if (err) throw err

    commentsDB = client.db(database)
    
    app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
})

app.set('port', (process.env.PORT || 3000));

app.get('/api/usernames', function(req, res) {
    var usernamesList = usernamesDB.collection('usernames').find({}).toArray((err, result) => {
        console.log("Result: " + result);
        if(err) throw err;
        res.json(result);
    });
});

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
    // Select all comments from the comments database
    var commentList = commentsDB.collection('comments').find().toArray((err, result) => {
        if (err) throw err
        res.send(result)
    })
    
});


app.post('/api/comments', function(req, res) {
    //Insert submitted comment into the comments database
    commentsDB.collection('comments').insert({
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
    });
});




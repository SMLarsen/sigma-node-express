// - DONE: Don't allow the user to add duplicate songs.
// - DONE: Don't allow the user to add songs with a blank artist or title field.
// - DONE: Before pushing to our array, add a property to the new song object for
//    the dateAdded with the current date.
// - DONE: Add the dateAdded to our DOM display for our songs.
// - DONE: NOTE: You're going to have to send back a status code of 400 if
//  there are problems. That means your client code needs to be able to
//  handle the error case and tell the user!
// - DONE: Move your new logic into a module (like in Module Madness) and export
//    the functions needed. This keeps the code nice and organized. Have a look
//   at the Router() object in Express.


// node/express application

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var date = require('./modules/utils/getDate');
var valDupSong = require('./modules/valDupSong');
var valEmptyFields = require('./modules/valEmptyFields');

// puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('port', process.env.PORT || 3000);

// Build initial song data
var songs = [{
    artist: "Bruce Springsteen",
    title: "Born in the U.S.A.",
    dateAdded: date.today
}];

// ===================  Routes  ===========================

// add new song from from client to song array
app.post('/songs', function(req, res) {
    // req.body is supplied by bodyParser above
    var newSong = req.body;
    if (valDupSong(songs, newSong) || valEmptyFields(newSong)) {
        res.sendStatus(400);
    } else {
        newSong.dateAdded = date.today;
        songs.push(newSong);
        res.sendStatus(201);
    }
});

// get and send songs to client
app.get('/songs', function(req, res) {
    res.send(songs);
});

// static file routing
app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public/', file));
    // /public/views/index.html
});

// initiation of server
app.listen(app.get('port'), function() {
    console.log('Server is listening on port ' + app.get('port'));
});

// Instructions
// Take the lecture code and add some logic to our POST route on the server. Do this logic on the server!
//
// - Don't allow the user to add duplicate songs.
// - Don't allow the user to add songs with a blank artist or title field.
// - Done: Before pushing to our array, add a property to the new song object for the
//    dateAdded with the current date. You'll have to look up the Date object in
//    javascript.
//
// - Add the dateAdded to our DOM display for our songs.
//
// - NOTE: You're going to have to send back a status code of 400 if there are
 // problems. That means your client code needs to be able to handle the error
 // case and tell the user!
//
// HARD MODE
// - Move your new logic into a module (like in Module Madness) and export the
//  functions needed. This keeps the code nice and organized. Have a look at the
//  Router() object in Express.

// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var date = require('./modules/utils/getDate');

// puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

// Our song data
var songs = [
  {
    artist: "Bruce Springsteen",
    title: "Born in the U.S.A.",
    dateAdded: date.today
  }
];

console.log(songs);

// Routes
app.post('/songs', function(req, res) {
  // req.body is supplied by bodyParser above
  console.log("REQ body: ", req.body);
  var newSong = req.body;
  newSong.dateAdded = date.today;
  songs.push(newSong);

console.log(songs);
  // created new resource
  res.sendStatus(201);
});

app.get('/songs', function(req, res) {
  console.log('handling get request for songs');
  // response options
  // res.sendStatus(200);
  res.send(songs);
});

// static file routing
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  console.log(file);

  res.sendFile(path.join(__dirname, './public/', file));
  // /public/views/index.html
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});

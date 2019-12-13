// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var exec = require('child_process').execFile;

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
// The static paths below copy the js,css,font amd img files to the browser.
app.use(express.static(path.join(__dirname, 'static')));
// require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

app.get('/', function(req, res) { 
    res.sendfile(path.join(__dirname + '/public/BootTabs.html'));
}); 
// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var tableData = require("../data/tableData");
var waitListData = require("../data/waitinglistData");
var BlackData = require("../data/BlackData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  var exec = require('child_process').execFile;

  app.get("/api/tables", function(req, res) {
    res.json(tableData);
  });

  app.get("/api/waitlist", function(req, res) {
    res.json(waitListData);
  });

  //  Line below is what needs to be sent from the calculate button in the HTML file.  
  //  localhost:8080/api/black?func=BSCALL&S=50&K=50&r=.10&sigma=.30&time=.50
  // The call to the C++ executable as a get - 
  app.get('api/black/test', function(req, res){
    res.json(BlackData);
  });

 app.get('/api/black', function(req, res){
      const func = req.param('func');
      var S = req.param('S');
      var K = req.param('K')
      var r = req.param('r');
      var sigma = req.param('sigma');
      var time = req.param('time');
      //var paramsin = "[ " + func + " " + S + " " + K + " " + r + " " + sigma + " " + time + " ]" ; 
      const paramsin = [ func + " " + S + " " + K + " " + r + " " + sigma + " " + time  ] ; 
      console.log(paramsin);
      var params =['BSCALL 50 50 .10 .30 .50'];      
      var price = " ";      
       
      price = Blackwait(paramsin)
      //price = BlackCalc(paramsin);
      res.send((BlackCalc(paramsin)));
       console.log("the price back from blackwait is" ,price);
      });
      function BlackCalc(paramsin){
        exec("./BlackScholesP91",paramsin ,function(error, stdout) {        
          price = stdout.toString();            
          return (price);
          res.send(price);  
      });  
      
      };

      function Blackwait(paramsin) {
        return new Promise(resolve => {
          price = BlackCalc(paramsin,result => resolve(result));          
        })
      }
    
    
 
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/tables", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    if (tableData.length < 5) {
      tableData.push(req.body);
      res.json(true);
    }
    else {
      waitListData.push(req.body);
      res.json(false);
    }
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    tableData = [];
    waitListData = [];

    console.log(tableData);
  });
};

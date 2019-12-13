// grab the packages we need
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var execFile = require('child_process').execFile;
var exec = require('child_process').exec;
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// routes go here
// to use new command req.params.func have to add parameters to the api.get method  
  app.get('/api/black', function(req, res){
      const func = req.param('func');
      var S = req.param('S');
      var K = req.param('K')
      var r = req.param('r');
      var sigma = req.param('sigma');
      var time = req.param('time');
      //var paramsin = "[ " + func + " " + S + " " + K + " " + r + " " + sigma + " " + time + " ]" ; 
      var paramsin = [ func + " " + S + " " + K + " " + r + " " + sigma + " " + time  ] ; 
      console.log(paramsin);
      var params =['BSCALL 50 50 .10 .30 .50'];      
      var price = " ";     
      //var paramsin = " "; 
      execFile("./BlackScholes", paramsin, function(error, stdout) {        
              price = stdout.toString();
              console.log(price);
          //    console.log(error);
              res.send(price);  
          });  
    //  console.log(price);
      });

      app.get('/api/users', function(req, res) {
        var user_id = req.param('id');
        var token = req.param('token');
        var geo = req.params.geo;  
      
        res.send(user_id + ' ' + token + ' ' + geo);  
    });
// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);

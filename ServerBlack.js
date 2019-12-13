// grab the packages we need
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var execFile = require('child_process').execFile;
var exec = require('child_process').exec;
var port = process.env.PORT || 8080;

      var params = [ 'BSPARTIALPUT 50 50 .10 .30 .50' ];      
      var price = " ";     
      //var paramsin = " "; 
     // console.log("In the Console.log ", params);
    //   execFile("BlackScholes", ['BSCALL 50 50 .10 .30 .50'], function(error, stdout) {        
    //           price = stdout.toString();
    //           console.log(price);
    //           console.log(error);              
    //       });  

    //  console.log(price);
    execFile('./BlackScholes', params, (error, stdout, stderr) => {
        if (error) {
            console.error('sderr'. stderr);
            throw error;
        }
        console.log(stdout);
        var JsonVar = JSON.parse(stdout); 
        console.log (JsonVar["Theta"]);
    });  

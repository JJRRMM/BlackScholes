// TO run this script use npm test.  - make sure server exports app and has apiroutes. 
// make sure chai and chai-http are installed and mocah. Change the package.json file to "test": "./node_modules/.bin/mocha test.js --exit",
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const expect = chai.expect;

chai.use(chaiHttp);

// Below statement will require the app object from server.js where it is exported.
const app = require('./server'); 
chai.should();

// var Calcparams = "/api/black?func=" + func + "&S=" + S + "&K=" + K + "&r=" + R + "&sigma=" + V + "&time=" + T ;
describe("GET /api/black?func=", () => {
    it("should return object",(done) => {
chai.request(app)
    .get('/api/black?func=BSPUT&S=50&K=50&r=.10&sigma=.30&time=.50')
    .end(function(error, result){
        result.should.have.status(200);  
        result.body.should.be.a('object');
        done();
    }); 
});
});

describe("GET /api/black?func=", () => {
    it("should return 5.45325",(done) => {
chai.request(app)
    .get('/api/black?func=BSCALL&S=50&K=50&r=.10&sigma=.30&time=.50')
    .end(function(error, result){
        var responseStatus = result.status;
        var responseBody = result.body;
        expect(responseStatus).to.equal(200);
        expect(responseBody).to.be.an("object")
          .that.includes({ Price: 5.45325 });
        done();
    }); 
});
});

describe("GET /api/black?func=", () => {
    it("should return 3.01472",(done) => {
chai.request(app)
    .get('/api/black?func=BSPUT&S=50&K=50&r=.10&sigma=.30&time=.50')
    .end(function(error, result){
        var responseStatus = result.status;
        var responseBody = result.body;
        expect(responseStatus).to.equal(200);
        expect(responseBody).to.be.an("object")
          .that.includes({ Price: 3.01472 });
        done();
    }); 
});
});

describe("GET /api/black?func=", () => {
    it("should return Delta: 0.633737",(done) => {
chai.request(app)
    .get('/api/black?func=BSPARTIALCALL&S=50&K=50&r=.10&sigma=.30&time=.50')
    .end(function(error, result){
        var responseStatus = result.status;
        var responseBody = result.body;
        expect(responseStatus).to.equal(200);
        expect(responseBody).to.be.an("object")
          .that.includes({ Delta: 0.633737 });
        done();
    }); 
});
});
var superagent = require('superagent');
var expect = require('expect.js');


var assert = require('assert');
var testing_url = "http://localhost:3000";

describe('basic functionality', function(){
  it('should return the index page', function(done){
    console.log(testing_url);
    superagent.get(testing_url)
      .end(function(res){
        expect(res.ok).to.eql(true);
        done();
      })
  });

});

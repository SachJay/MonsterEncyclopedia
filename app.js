var express = require('express');
var fetch = require('node-fetch');
const fs = require('fs');

var app = express();
var data;

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.get('/', function(req, res){
  var contents = fs.readFileSync(__dirname + '/assets/data.json', 'utf8');
  res.render('homepage', {chara: JSON.parse(contents)[27]});
});

app.get('/monsters', function(req, res){
  var contents = fs.readFileSync(__dirname + '/assets/data.json', 'utf8');
  res.render('monsterInfo', {chara: JSON.parse(contents)[req.query.id]});
});

app.get('/upload', function(req, res){
  fetch("http://rest.learncode.academy/api/sachinthana/friends")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson[0]);
  // res.render('monsterInfo', {chara: myJson[0]});
  });

});

app.listen(3000, '127.0.0.1');
console.log("Now listening to port 3000");

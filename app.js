var express = require('express');
var fetch = require('node-fetch');
const fs = require('fs');
var data = require('./assets/data.json');
var app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(express.urlencoded({
  extended: false
}));

app.get('/', function(req, res){
  var length = data.length;

  for(var index = 0; index < length; index++) {
    if(data[index] != null){
      if(data[index].name == '[DELETED]'){
        data.splice(index, 1);
        index--;
      } else {
        data[index].index = index;
      }
    }
  }

  fs.writeFile('./assets/data.json', JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log('Updated!');
  });

  res.render('homepage', {chara: data[0]});
});

app.get('/monsters', function(req, res){
  res.render('monsterInfo', {chara: data[req.query.id]});
});

app.post('/upload', function(req, res) {
  req.body.index = data.length;

  req.body = makeActionPerma(req.body, "special_abilities");
  req.body = makeActionPerma(req.body, "actions");

  data.push(req.body);
  fs.writeFile('./assets/data.json', JSON.stringify(data), function(err) {
    if (err) {
     console.log("err");
   }
    console.log('Saved!');
  });
  res.status(301).redirect('/');
});

app.get('/delete', function(req, res) {
 var id = req.query.id;
 data[id].name = '[DELETED]';

 fs.writeFile('./assets/data.json', JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log('Saved!');
  });
  res.status(301).redirect('/');
});

app.listen(3000, '127.0.0.1');
console.log("Now listening to port 3000");

function makeActionPerma(body, action){
  var special_abilities = [];

  if(Array.isArray(body["temp_"+action+"_name"])){
    var length = body["temp_"+action+"_name"].length;

    for(var i = 0; i < length; i++){
      var tempAction = {
        name: body["temp_"+action+"_name"][i],
        desc: body["temp_"+action+"_desc"][i]
      };
    }
  } else {
    var tempAction = {
      name: body["temp_"+action+"_name"],
      desc: body["temp_"+action+"_desc"]
    };
  }

  special_abilities.push(tempAction);
  body[action] = special_abilities;

  return body;
}

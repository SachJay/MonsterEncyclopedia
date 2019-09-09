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
        data[index].id = index;
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

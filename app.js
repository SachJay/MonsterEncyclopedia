var express = require('express');
var fetch = require('node-fetch');
const fs = require('fs');
var data = require('./assets/dataTest.json');
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
      //console.log(index);
      if(data[index].name == '[DELETED]'){
        data.splice(index, 1);
        index--;
      } else {
        data[index].index = index;
      }
    }
  }

  fs.writeFile('./assets/dataTest.json', JSON.stringify(data), function(err) {
    if (err) {
      console.log("EERRR");
      throw err;
    }
    console.log('Updated!');
  });

  var id;

  if(req.query.id == null){
    id = 0;
  } else {
    id = req.query.id;
  }

  res.render('homepage', {chara: data[id]});
});

app.get('/monsters', function(req, res){
  res.render('monsterInfo', {chara: data[req.query.id]});
});

app.post('/upload', function(req, res) {
  var edit = true;

  if(req.body.submit == "Upload Character"){
      req.body.index = data.length;
      edit = false;
  }

  delete req.body["submit"];

  req.body = makeActionPerma(req.body, "special_abilities");
  req.body = makeActionPerma(req.body, "actions");
  req.body = makeActionPerma(req.body, "legendary_actions");

  data.push(req.body);
  fs.writeFile('./assets/dataTest.json', JSON.stringify(data), function(err) {
    if (err) {
     console.log("err");
   }
    console.log('Saved!');
  });

  if(edit){
    res.status(301).redirect('/delete?id='+req.body.index);
  } else {
    res.status(301).redirect('/');
  }

});

app.get('/delete', function(req, res) {
 var id = req.query.id;
 data[id].name = '[DELETED]';

 fs.writeFile('./assets/dataTest.json', JSON.stringify(data), function(err) {
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
        desc: body["temp_"+action+"_desc"][i],
        attack_bonus: body["temp_"+action+"_attack_bonus"][i],
        damage_dice: body["temp_"+action+"_damage_dice"][i],
        damage_bonus: body["temp_"+action+"_damage_bonus"][i],
        desc: body["temp_"+action+"_desc"][i]
      };

      special_abilities.push(tempAction);
    }
  } else {
    var tempAction = {
      name: body["temp_"+action+"_name"],
      desc: body["temp_"+action+"_desc"],
      attack_bonus: body["temp_"+action+"_attack_bonus"],
      damage_dice: body["temp_"+action+"_damage_dice"],
      damage_bonus: body["temp_"+action+"_damage_bonus"],
    };

    special_abilities.push(tempAction);
  }

  delete body["temp_"+action+"_name"];
  delete body["temp_"+action+"_desc"];
  delete body["temp_"+action+"_attack_bonus"];
  delete body["temp_"+action+"_damage_dice"];
  delete body["temp_"+action+"_damage_bonus"];


  body[action] = special_abilities;

  return body;
}

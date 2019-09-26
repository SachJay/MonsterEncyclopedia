var currentPage = null;
var currentCatagory = null;
var fileData;
var numOfCharacters = 0;

$(function(){
  var $characters = $('#currentCatagory');
  var $info = $('#info');

  $characters.delegate('.displayButton', 'click', function(){
    var $character = $(this).closest('button');
    $(location).attr('href', "/monsters?id="+$(this).attr("data-id"));
  });

  $characters.delegate('.editButton', 'click', function(){
    var $character = $(this).closest('div');
    $(location).attr('href', "/?id="+$(this).attr('data-id'));
  });

  $characters.delegate('.deleteButton', 'click', function(){
    var $character = $(this).closest('div');
    $(location).attr('href', "/delete?id="+$(this).attr('data-id'));
  });

  $info.delegate('.deleteButton', 'click', function(){
    $(this).closest('div').remove();
  });
});

function displayTopics(){
  $.ajax({
    type: 'GET',
    url: '/assets/dataTest.json',
    success: function(charas){

      for (var i = 0; i < charas.length; i++) {
        if(charas[i].name != '[DELETED]'){
          createTopicButton(charas[i], i);
        }
      }
    }, error: function(){
      console.log("Error");
      alert("Error loading page");
    }
  });
}

function addAction(id){
  var jsonName;

  if(id == "#special_abilities"){
    jsonName = 'temp_special_abilities';
  } else if(id == "#actions"){
    jsonName = 'temp_actions';
  }
  var name = jsonName+'_name';
  var desc = jsonName+'_desc';
  var attack_bonus = jsonName+'_attack_bonus';
  var damage_dice = jsonName+'_damage_dice';
  var damage_bonus = jsonName+'_damage_bonus';

  $(id).append("<div>" +
  "Name:<input name="+name+" type='text' class='actionTitle'></input><br>" +
  "Desc:<input name="+desc+" type='text' class='actionInfo'></input><br>" +
  "Attack Bonus:<input name="+attack_bonus+" class='actionTitle'></input><br>" +
  "Damage Dice:<input name="+damage_dice+" type='text' class='actionTitle'></input><br>" +
  "Damage Bonus:<input name="+damage_bonus+" type='text' class='actionTitle'></input><br>" +
  "<button type='button' class='deleteButton' name='button'>X</button><br><br>" +
  "<div>");
}

function createTopicButton(topic, i){
  $('#currentCatagory').append("<button class='displayButton' data-id="+i+">"+topic.name+"</button>");
  $('#currentCatagory').append("<button class='editButton' data-id="+i+">E</button>");
  $('#currentCatagory').append("<button class='deleteButton' data-id="+i+">X</button><br>");
}

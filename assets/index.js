var currentPage = null;
var currentCatagory = null;
var fileData;
var numOfCharacters = 0;

$(function(){
  var $characters = $('#currentCatagory');

  $.ajax({
    type: 'GET',
    url: '/assets/data.json',
    success: function(characters){
      fileData = characters;
      displayTopics();
    }, error: function(){
      alert("Error loading page");
    }
  });

  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/sachinthana/friends',
    success: function(characters){
      fileData = characters;
      displayTopics();
    }, error: function(){
      alert("Error loading page");
    }
  });

  $("#add-character").on("click", function(){
    var chara = {
      name: document.getElementById("inputName").value,
      size: "Medium",
      type: "humanoid",
      subtype: "any race",
      alignment: "any alignment",
      armor_class: 10,
      hit_points: 9,
      hit_dice: "2d8",
      speed: "30 ft.",
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 14,
      charisma: 11,
      medicine: 4,
      religion: 2,
      damage_vulnerabilities: "",
      damage_resistances: "",
      damage_immunities: "",
      condition_immunities: "",
      senses: "passive Perception 12",
      languages: "any one language (usually Common)",
      challenge_rating: "1/4",
      special_abilities: [],
      actions: []
    };

    $.ajax({
      type: 'POST',
      url: 'http://rest.learncode.academy/api/sachinthana/friends',
      data: chara,
      success: function(newChara){
        createTopicButton(newChara, numOfCharacters);
      }
    });
  });

  $characters.delegate('.remove-chara', 'click', function(){
    var $li = $(this).closest('li');

    $.ajax({
      type: 'DELETE',
      url: 'http://rest.learncode.academy/api/sachinthana/friends/' + $(this).attr('data-id'),
      success: function(){
        $li.remove();
      }
    });
  });
});

var charaTemplate = "" +
"<input type='text' class='actionTitle'></input>" +
"<input type='text' class='actionInfo'></input><br>"
+ "<br>";

function addAction(id){
  $(id).append(Mustache.render(charaTemplate));
}

function displayTopics(){
  for(var i = 0; i < fileData.length; i++){
    createTopicButton(fileData[i], numOfCharacters+i);
  }
  numOfCharacters += parseInt(fileData.length);
}

function createTopicButton(topic, i){
  var topicButton = document.createElement("input");
  topicButton.type = "button";
  topicButton.value = topic.name;
  topicButton.addEventListener('click', function(){
    $(location).attr('href', "http://127.0.0.1:3000/monsters?id="+i);
    });
  document.getElementById("currentCatagory").appendChild(topicButton);

  var br = document.createElement("br");
  document.getElementById("currentCatagory").appendChild(br);
}

function clearCurrentPage(parentId, childId){
  document.getElementById(parentId).removeChild(document.getElementById(childId));
}

function getCatagory(catagoryNum){
  return data[catagoryNum];
}

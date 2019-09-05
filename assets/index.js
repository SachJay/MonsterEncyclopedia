var currentPage = null;
var currentCatagory = null;
var fileData;

$(function(){
  var $characters = $('#characters');

  var charaTemplate = "" +
  "<li>" +
  "<p><strong>Name:</strong> {{name}}<p/>" +
  "<p><strong>Hp:</strong> {{hit_points}}<p/>" +
  "<button data-id='{{id}}' class='remove-chara'>X</button>" +
  "</li>";

  function addChara(chara){
    $characters.append(Mustache.render(charaTemplate, chara));
  }

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
/*
  $("#add-character").on("click", function(){
    var chara = {
      name: $name.val(),
      hp: $hp.val()
    };

    $.ajax({
      type: 'POST',
      url: 'http://rest.learncode.academy/api/sachinthana/friends',
      data: chara,
      success: function(newChara){
        addChara(newChara);
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
  });*/
});

var charaTemplate = "" +
"<input type='text' class='actionTitle'></input>" +
"<input type='text' class='actionInfo'></input><br>"
+ "<br>";

function addAction(id){

  $(id).append(Mustache.render(charaTemplate));
}

function displayTopics(){
  clearCurrentPage("everything", "currentCatagory");

  var currentCatagory = document.createElement("div");
  currentCatagory.id = "currentCatagory";
  document.getElementById("everything").appendChild(currentCatagory);

  for(var i = 0; i < fileData.length; i++){
    createTopicButton(fileData[i], i);
  }
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

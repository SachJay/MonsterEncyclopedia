var currentPage = null;
var currentCatagory = null;
var fileData;
var numOfCharacters = 0;

$(function(){
  var $characters = $('#currentCatagory');

  $characters.delegate('.displayButton', 'click', function(){
    var $character = $(this).closest('button');
    $(location).attr('href', "/monsters?id="+$(this).attr("data-id"));
  });

  $characters.delegate('.deleteButton', 'click', function(){
    var $character = $(this).closest('div');
    $(location).attr('href', "/delete?id="+$(this).attr('data-id'));
  });
});

function displayTopics(){
  $.ajax({
    type: 'GET',
    url: '/assets/data.json',
    success: function(charas){

      for (var i = 0; i < charas.length; i++) {
        if(charas[i].name != '[DELETED]'){
          createTopicButton(charas[i], i);
        }
      }
    }, error: function(){
      alert("Error loading page");
    }
  });
}

var actionTemplate = "" +
"<input type='text' class='actionTitle'></input>" +
"<input type='text' class='actionInfo'></input><br>"
+ "<br>";

function addAction(id){
  $(id).append(Mustache.render(actionTemplate));
}

function createTopicButton(topic, i){
  $('#currentCatagory').append("<button class='displayButton' data-id="+i+">"+topic.name+"</button>");
  $('#currentCatagory').append("<button class='deleteButton' data-id="+i+">X</button><br>");
}

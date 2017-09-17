$(document).ready(function() {
  var $go = $("#go");
  var $choice = $(".choice");
  var $name = $(".name");
  var $yes = $("#yes");
  var $no = $("#no");
  var $normalRes = $("#normalRes");
  var $seen = $("#seen");
  var $heart = $(".heart");
  var $counter = $("#counter");
  
  var origPosY = $("#yes").position();
  var origPosN = $("#no").position();
  var clickCounter = 0;
  var clickable = true;
  var showSeen = 0;
  var answerChoices = [
    "Aww, I love you too! &#9829;",
    "Flirt alert!",
    "Let's just be friends.",
    "I knew it!",
    "I'm blushing.",
    "I know...",
    "Wow, you're so brave.",
    "At least you're honest.",
    "OMG I'm telling the group chat",
    "Are you hitting on me?",
    "I love me too :V",
    "I'm loyal",
    "Pinch me I must be dreaming.",
    "Where are you taking me for our first date?",
    "I need an adult!",
    "Roses r red,<br> violets r blue,<br> Im 2 cute 4 u",
    "lol k",
    "I-i-it's not like I like you back or anything! *blush*",
    "*screenshots our convo and accidentally sends it back to you*",
    "totes awks",
    "#OneTruePairing",
    "Will you dream about me tonight? ;)",
    "Call me",
    "I bet you say that to every Jacob",
    "ILYSM <333",
    "I don't blame you",
    "I get that a lot"
  ];

  var answersUsed = [];
  
  var hearts = [$("#heart1"), $("#heart2"), $("#heart3"), $("#heart4"), $("#heart5"), $("#heart6")];
  
  $(document).on("keypress", function(e) {
    if (e.which == 13) {
      $go.mousedown();
    }
  });

  $go.on("mousedown touchstart", function() {
    var name = $("#nameEnterField").val();
    $name.html(name);
    if (name < 1) {
      $("#nameEnterMessage").html("Stop playing hard to get.");
      return false;
    }
    answerChoices.push(name + " loves Jacob! &#9829;");
    answerChoices.push("<i><b>Dear diary</b>,<br> I, " + name + ", am totally in love with Jacob</i>");
    $("#nameEnterArea").hide();
    $("#mainArea").fadeIn("slow");

  });

  $choice.one("mousedown touchstart", function() {
    $("#counterShow").fadeIn("slow");
  });

  $no.on("mousedown touchstart", function() {
    var yesPosition = $("#yes").position();
    var noPosition = $("#no").position();

    $yes.css(noPosition);
    $no.css(yesPosition);

  });

  $choice.on("mousedown touchstart", function() {
    
    if (!clickable) {
      return false;
    }
  
    clickable = false;
    setTimeout(function() {
      clickable = true;
    }, 300);

    clickCounter++;
    $normalRes.hide();
    $seen.hide();
    $heart.hide();
    $counter.html(clickCounter);
    if (answerChoices.length <= 0) {
      for (var a in answersUsed) {
        answerChoices.push(answersUsed[a]);
      }
      answersUsed = [];
    }
     
    if(showSeen < 26){
    var index = (Math.floor(Math.random() * answerChoices.length));
    $normalRes.html(answerChoices[index]);
    answersUsed.push(answerChoices[index]);
    answerChoices.splice(index, 1);
      $normalRes.show();
      showSeen+=1;
    }
    else if(showSeen >= 26){
      $seen.show();
      showSeen = 0;
    }
    
    hearts[Math.floor(Math.random()*hearts.length)].show();
  });

  $choice.on("mousedown touchstart", function() {
    $yes.addClass("clicked");
  });

  $(document).on("mouseup touchend", function() {
    $yes.removeClass("clicked");
  });

  $(window).on("resize", function() {
    $yes.css("left", "");
    $yes.css("top", "");
    $no.css("left", "");
    $no.css("top", "");
  });

  
});



var app = angular.module('flirtApp', [])
app.controller('flirtController', function($scope) {
  $scope.currentTime = new Date();
  setInterval(function(){
    $scope.$apply(function(){
    $scope.currentTime = new Date();
    })
  }, 1000);

});
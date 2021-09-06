let colorArray = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;


$(document).keypress(function(event) {
  if (!started) {
    nextSequence();
    started = true
  }
});

$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  console.log(userChosenColor)
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success')
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    playSound("wrong")
    $("body").addClass("game-over")
    $("h1").text("Game Over Press Any Key to Restart")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
};

function startOver() {
  gamePattern = [];
  userClickedPattern= []
  level = 0;
  started = false;
};

function nextSequence() {
  userClickedPattern = []
  level++
  $("h1").text("Level " + level)
  let randomNumber = Math.floor((Math.random() * 4));
  let randomChosenColor = colorArray[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
};

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(function() {
    self.removeClass("pressed");
  }, 100);
};

function playSound(name) {
  let audioFile = "sounds/" + name + ".mp3";
  var audio = new Audio(audioFile);
  audio.play();
};

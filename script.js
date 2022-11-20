$(document).ready(function() {

  //For score board
  $scoreBoard = $('#score');
  var score = 0;
  var updateScore = function() {
    var string = 'Score: ';
    string += score;
    $scoreBoard.html(string);
    score += 5;
    setTimeout(updateScore, 100);
  };
  updateScore();


});
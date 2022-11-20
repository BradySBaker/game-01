//Create global variables
$(document).ready(function() {
  $block = $('.block');
  $character = $('#character');
    //---- Detect collision ----
    var checkDead = function() {

    var $charTop = getPosition($character, 'top');
    var $charLeft = getPosition($character, 'left');
    var $blockTop = getPosition($block, 'top');
    var $blockLeft = getPosition($block, 'left');

    var topDistance = Math.abs($charTop - $blockTop - 40); //Offset by 40
    var leftDistance = Math.abs($charLeft - $blockLeft);
    var curDistance = Math.sqrt((topDistance**2) + (leftDistance**2));
    if (curDistance < 50) {
      location.reload();
    }
    setTimeout(checkDead, 100);
  }
  checkDead();
    //---- Detect collision ----
})

var getPosition = function(element, pos) {
  var result = element.css(pos);
  result = result.slice(0, result.length - 2);
  return result;
}
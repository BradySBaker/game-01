//Global variables
var spaceDown = false;
$(document).ready(function() {
  var $character = $('#character');
  //Jump function for character --------------
  //Key Pressed
  var jump = function() {
    $(document).on('keypress' , function (key) {;
      if (spaceDown === true) {
        return;
      }
      if ($character.attr("class") === 'animate') {
        return;
      };
    if (key.key === ' ') {
      $character.addClass('animate');
      setTimeout(resetJump, 400);
      spaceDown = true;
    }
    })
  };
  jump();
  //Jump Cancel
  //Key held down
  $(document).on('keyup', function(key) {
    if (key.key === ' ') {
      spaceDown = false;
    }
  })
  //Allow jump to be called again
  var resetJump = function() {
    $character.removeClass('animate');
  }
  //End of jump function --------------


});
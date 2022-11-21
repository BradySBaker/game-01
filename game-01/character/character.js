$(document).ready(function() {
  //Set jump parameters
  var jumpSpeed = 10;
  var topOfJumpReached = false;
  var jumpFinished = true;
  //Set character parameters
    window.$character = $('#character');
    $character.x = 0;
    $character.y = 0;
    var keyObj = {d: false, a: false, space: false};

  //-----Detect key presses ----
  //Detect key down
  $(document).on('keypress', function(key) {
    if (key.key === 'd') {
      keyObj['d'] = true;
    }
    if (key.key === 'a') {
      keyObj['a'] = true;
    }
    if (key.key === ' ') {
      keyObj['space'] = true;
    }
  });
  //Detect key up
  $(document).on('keyup', function(key) {
    if (key.key === 'd') {
      keyObj['d'] = false;
    }
    if (key.key === 'a') {
      keyObj['a'] = false;
    }
    if (key.key === ' ') {
      keyObj['space'] = false;
    }
  });
  //-----Detect key presses ----


  //-----Move character -----
  var move = function() {
    var $curLeft = getCSSValue($character, 'left');
    if (keyObj['d'] === true && $character.x < 980 && keyObj['a'] === false) {
      $character.css('left', $curLeft + 10);
      $character.x += 10;
    }
    if (keyObj['a'] === true && $character.x > 0 && keyObj['d'] === false) {
      $character.css('left', $curLeft - 10)
      $character.x -= 10;
    }
    if (keyObj['space'] === true) {
      if (jumpFinished === true) {
        jumpFinished = false;
        topOfJumpReached = false;
        jump();
      }
    }
    setTimeout(move, 30);
  }
  move();
  //Jump character
  var jump = function() {
    $curTop = getCSSValue($character, 'top');
    if ($character.y < 50 && topOfJumpReached !== true) {
      $character.css('top', $curTop - jumpSpeed);
      $character.y += jumpSpeed;
      setTimeout(jump, 30);
    } else if ($character.y > 0) {
      topOfJumpReached = true;
      $character.css('top', $curTop + jumpSpeed);
      $character.y -= jumpSpeed;
      setTimeout(jump, 30);
    } else {
      jumpFinished = true;
    }
  }
  //-----Move character -----


});
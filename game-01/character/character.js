$(document).ready(function() {
  //Set jump parameters
  var imageDirection = 'forward';
  var jumpSpeed = 15;
  var jumpHeight = 100;
  var topOfJumpReached = false;
  var jumpFinished = true;
  //Set character parameters
    window.$character = $('#character');
    $character.x = 0;
    $character.y = 0;
    $character.moveSpeed = 5;
    $character.stopMovement = true;
    var keyObj = {d: false, a: false, space: false};

  //Set character Position ---
  var $height = getCSSValue($character, "height");
  $character.css("top", 335 - $height);
  //Set character Position ---
  //-----Detect key presses ----

  //Fly -----------------
  $(document).on('keypress', function(key) {
    var curTop = getCSSValue($character, "top");
    if (key.key === 'w') {
      $character.css("top", curTop - 5);
      $character.y += 5;
    }
    if (key.key === 's') {
      $character.css("top", curTop + 5);
      $character.y -= 5;
    }
  });
  //Fly -------------

  //Detect key down
  $(document).on('keypress', function(key) {
    if (key.key === 'd') {
      //Flip character
      if (imageDirection !== 'forward') {
        $character.css('transform', 'scaleX(1)')
        imageDirection = 'forward';
      }
      keyObj['d'] = true;
    }
    if (key.key === 'a') {
      //Flip character
      if (imageDirection !== 'backward') {
        $character.css('transform', 'scaleX(-1)')
        imageDirection = 'backward'
      }
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
    if ($character.stopMovement !== true) {
      var $curLeft = getCSSValue($character, 'left');
      if (keyObj['d'] === true && $character.x < 980 && keyObj['a'] === false) {
        $character.css('left', $curLeft + $character.moveSpeed);
        $character.x += $character.moveSpeed;
      }
      if (keyObj['a'] === true && $character.x > 0 && keyObj['d'] === false) {
        $character.css('left', $curLeft - $character.moveSpeed)
        $character.x -= $character.moveSpeed;
      }
      if (keyObj['space'] === true) {
        if (jumpFinished === false) {}
        if (jumpFinished === true) {
          switchAnimation('../assets/Character/jump-animation.gif');
          setTimeout(function() {switchAnimation('../assets/Character/idle-animation.gif')}, 210);
          jumpFinished = false;
          topOfJumpReached = false;
          jump();
        }
      }
    }
    setTimeout(move, 20);
  }
  move();
  //Jump character
  var jump = function() {
    if ($character.stopMovement !== true) {
      //Play Jump Animation
      $curTop = getCSSValue($character, 'top');
      if ($character.y < jumpHeight && topOfJumpReached !== true) {
        $character.css('top', $curTop - jumpSpeed);
        $character.y += jumpSpeed;
        setTimeout(jump, 30);
      } else if ($character.y > 0) {
        topOfJumpReached = true;
        $character.css('top', $curTop + jumpSpeed);
        $character.y -= jumpSpeed;
        setTimeout(jump, 30);
      } else {
        switchAnimation('../assets/Character/moving-animation.gif');
        jumpFinished = true;
      }
    }
  }
  //-----Move character -----

  var switchAnimation = function(url) {
    $character.css('background-image' , 'url("' + url + '"' + ')');
  }
});

$(document).ready(function() {
  var charWidthOffset = 8;
  //---Value Getter---
  window.getCSSValue = function(element, value) {
    $value = element.css(value);
    $value = $value.slice(0, $value.length - 2);
    $value = Number($value);
    return $value;
  }
  //---Value Getter---

  //---Menu Controller--
  var start = false;
  var dead = false;
  $("#start").on('click', function() {
    if (dead === true) {
      location.reload();
    }
    start = true;
    $character.stopMovement = false;
    $("#start").css("left", -2000);
  });
  //---Update Score ---
  var score = 0;
  var updateScore = function() {
    if (dead !== true && start === true) {
      score += 10;
      $("#score").text("Score: " + score);
    }
    setTimeout(updateScore, 200);
  }
  updateScore();
  //---Update Score ---
  //---Menu Controller--

  //---Enemy Controller ---
  var enemyHeight = getCSSValue($(".enemy"), "height");
  var elementYOffset = enemyHeight + (getCSSValue($("#character"), 'height') - 20);
  var oldElementYOffset = elementYOffset;
  window.enemies = [];
  var enemyFunction = window['enemy'];
  var spawnEnemy = function() {
    var enemy = new enemyFunction(elementYOffset);
    enemies.push(enemy);
    enemy.$node.appendTo("#characterArea")
    elementYOffset += enemyHeight;
  }
  //---Enemy Controller ---

  //---Enemy Spawn Options ---
  $("#spawnEnemy").on('mousedown', function() {
      var $curTop = getCSSValue($("#spawnEnemy"), "top");
      $("#spawnEnemy").css("top", $curTop - enemyHeight);
      spawnEnemy();
  });
  var spawnEnemyAfter = function(time) {
    if (start === true && dead === false && enemies.length <= 4) {
      if (time === undefined) {
        time = 5000;
      }
      var $curTop = getCSSValue($("#spawnEnemy"), "top");
      $("#spawnEnemy").css("top", $curTop - enemyHeight);
      spawnEnemy();
    }
    setTimeout(spawnEnemyAfter, time);
  }
  spawnEnemyAfter();
  //---Enemy Spawn Options ---

  //---Collision Detection -------------------------------
  var characterHeight = getCSSValue($("#character"), "height");
  var characterWidth = getCSSValue($("#character"), "width") - charWidthOffset;
  var enemyWidth = getCSSValue($(".enemy"), "width");

  var detectCollision = function() {
    if (dead === false) {
      enemies.forEach(function (curEnemy) {
        if ($character.x + characterWidth >= curEnemy.x && $character.x <= curEnemy.x + enemyWidth) {
          if ($character.y <= curEnemy.y + enemyHeight && $character.y + characterHeight >= curEnemy.y) {
            enemies.forEach(function (enemyToBeStopped) {
              enemyToBeStopped.moveSpeed = 0;
            });
            $character.stopMovement = true;
            dead = true;
            $("#start").css("left", "45%");
            $("#start").text("restart");
            $gameOverText = $('<div id="gameOver">Game Over</div>')
            var $gameOverTextTop = getCSSValue($gameOverText, 'top');
            $gameOverText.css("top", $gameOverTextTop - elementYOffset);
            $gameOverText.appendTo($("#game"));
          }
        }
      });
    }
    setTimeout(detectCollision, 20);
  }
  //Make sure that character is created
  setTimeout(detectCollision, 20);
  //---Collision Detection ----------------------------


})


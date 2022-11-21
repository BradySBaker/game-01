$(document).ready(function() {
  //---Value Getter---
  window.getCSSValue = function(element, value) {
    $value = element.css(value);
    $value = $value.slice(0, $value.length - 2);
    $value = Number($value);
    return $value;
  }
  //---Value Getter---

  //---Enemy Controller ---
  var enemyYOffset = getCSSValue($(".enemy"), "height");
  var enemyHeight = getCSSValue($(".enemy"), "height")

  window.enemies = [];
  var enemyFunction = window['enemy'];
  var spawnEnemy = function() {
    var enemy = new enemyFunction(enemyYOffset);
    enemies.push(enemy);
    enemy.$node.appendTo("#characterArea")
    enemyYOffset += enemyHeight;
  }
  //---Enemy Controller ---
  $("#spawnEnemy").on('mousedown', function() {
      var $curTop = getCSSValue($("#spawnEnemy"), "top");
      $("#spawnEnemy").css("top", $curTop - enemyHeight);
      spawnEnemy();
  });
  /*
  Fix detect collision Pythagorean theorem to inacurate!!!*/
  //---Collision Detection ---
  var characterHeight = getCSSValue($("#character"), "height");
  var characterWidth = getCSSValue($("#character"), "width");
  var enemyWidth = getCSSValue($(".enemy"), "width");

  var detectCollision = function() {
    enemies.forEach(function (curEnemy) {
      if ($character.x + characterWidth >= curEnemy.x && $character.x <= curEnemy.x + enemyWidth) {
        if ($character.y <= curEnemy.y + enemyHeight && $character.y + characterHeight >= curEnemy.y) {
          console.log('Character Bottom ' + (curEnemy.y + enemyHeight));
        }
      }
    });
    setTimeout(detectCollision, .5);
  }
  //Make sure that character is created
  setTimeout(detectCollision, 10);


})
/*
Collision Box:
X = 0;
Y = 0;
Width = 5;
Right Side Collision: If X + width === Enemy X  ]
Left Side Collision: If X === Enemy X + Width
Top Side Collision: If Y + Height === Enemy Y
Bottom Side Collision if Y === Enemy Y + Height

*/
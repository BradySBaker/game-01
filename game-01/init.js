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
  var offset = getCSSValue($(".enemy"), "height");
  var originalOffset = getCSSValue($(".enemy"), "height")
  window.enemies = [];
  var enemyFunction = window['enemy'];
  var spawnEnemy = function() {
    var enemy = new enemyFunction(offset);
    enemies.push(enemy);
    enemy.$node.appendTo("#characterArea")
    offset += originalOffset;
  }
  //---Enemy Controller ---
  $("#spawnEnemy").on('mousedown', function() {
      var $curTop = getCSSValue($("#spawnEnemy"), "top");
      $("#spawnEnemy").css("top", $curTop - originalOffset);
      spawnEnemy();
  });
  /*
  Fix detect collision Pythagorean theorem to inacurate!!!*/
  //---Collision Detection ---
  var detectCollision = function() {
    enemies.forEach(function (curEnemy) {
      var xDist = Math.abs($character.x - curEnemy.x);
      var yDist = Math.abs($character.y - curEnemy.y);
      var distance = Math.sqrt(xDist**2 + yDist**2);
      if (distance < 20) {
        location.reload();
      }
    });
    setTimeout(detectCollision, 10);
  }
  //Make sure that character is created
  setTimeout(detectCollision, 10);


})
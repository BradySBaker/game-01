$(document).ready(function() {
  window.enemy = function(offset) {
    this.offset = offset;
    this.$node = $('<div class="enemy"></div>');
    this.x = 980;
    this.y = 0;
    this.direction = 'right';
    this.moveSpeed = 14; //Has to be a factor of 980
    this.respawnTime = Math.floor(Math.random() * (100-50) + 50);
    this.setOriginPosition();
    this.move();
  };
  enemy.prototype.setOriginPosition = function () {
    this.$node.css('top', 380 - this.offset);
    this.$node.css('left', 980);
  };
  enemy.prototype.move = function () {

    var $curLeft = getCSSValue(this.$node, 'left');
      if (this.x > 0) {
        this.$node.css("left", $curLeft - this.moveSpeed);
        this.x -= this.moveSpeed;
      } else if (this.respawnTime === 0) {
        this.$node.css("left", 980);
        this.x = 980;
        this.respawnTime = Math.floor(Math.random() * 100);
      } else {
        this.x = -2000;
        this.$node.css("left", 2000)
        this.respawnTime--;
      }

    setTimeout(this.move.bind(this), 20);
  }
});
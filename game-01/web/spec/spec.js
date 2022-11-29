$(document).ready(function() {
  var enemy1 = new enemy(20, 0);
  console.log(enemy1.moveSpeed);
  describe('enemy', function() {
    it('should be an object', function() {
      expect(typeof(enemy1)).to.be.equal('object');
    });
    it('should have x of 980', function() {
      expect(enemy1.x).to.be.equal(980);
    });
    it('should have a move function', function() {
      expect(typeof(enemy1.move)).to.equal("function");
    });
  });
});
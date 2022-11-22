$(document).ready(function() {
  var enemy1 = new enemy(20, 0);
  console.log(enemy1.moveSpeed);
  describe('enemy', function() {
    it('enemy should be an object', function() {
      expect(typeof(enemy1)).to.be.equal('object');
    });
    it('enemy should have x of 980', function() {
      expect(enemy1.x).to.be.equal(980);
    });
  });
});
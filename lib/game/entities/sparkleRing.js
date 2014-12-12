ig.module(
	'game.entities.sparkleRing'
)
.requires(
	'impact.entity',
	'game.entities.sparkticle'
)
.defines(function(){
EntitySparkleRing = ig.Entity.extend({
	
	
	update: function() {
		if (!ig.game.player.wearingPajamas) this.kill();
		this.pos.x = ig.game.player.pos.x + ig.game.player.size.x/2;
		this.pos.y = ig.game.player.pos.y + ig.game.player.size.y/2;

		var p1x = Math.random()*40 - 20 + this.pos.x;
		var p1y = Math.sqrt(400 - Math.pow((p1x-this.pos.x),2)) + this.pos.y-8;
		
		var p2x = Math.random()*40 - 20 + this.pos.x;
		var p2y = -1 * Math.sqrt(400 - Math.pow((p1x-this.pos.x),2)) + this.pos.y-8;
		
		var p3x = Math.random()*40 - 20 + this.pos.x;
		var p3y = Math.sqrt(400 - Math.pow((p1x-this.pos.x),2)) + this.pos.y-8;
		
		var p4x = Math.random()*40 - 20 + this.pos.x;
		var p4y = -1 * Math.sqrt(400 - Math.pow((p1x-this.pos.x),2)) + this.pos.y-8;

		
		ig.game.spawnEntity(EntitySparkticle, p1x, p1y, {});
		ig.game.spawnEntity(EntitySparkticle, p2x, p2y, {});
		ig.game.spawnEntity(EntitySparkticle, p3x, p3y, {});
		ig.game.spawnEntity(EntitySparkticle, p3x, p3y, {});
		
		this.parent();	
	}
});

});
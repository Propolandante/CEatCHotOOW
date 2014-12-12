ig.module(
	'game.entities.catsPajamas'
)
.requires(
	'impact.entity',
	'game.entities.sparkleRing'
)
.defines(function(){
	
EntityCatsPajamas = ig.Entity.extend({
	size: {x: 16, y: 16},
	
	origin: {x: 0, y: 0},
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/pajamas2.png', 16, 16),
	
	health: 1000,
	
	gravityFactor: 0,
	
	flipped: false,
	
	direction: 'up',
	


	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'idle', 0.2, [0, 0, 0, 1, 1] );
		
		this.origin.x = this.pos.x;
		this.origin.y = this.pos.y;
		
		ig.game.catsPajamas = this;
	},
	
	
	update: function(){
		
		//this code was to make it kind of hover in place, but it's not a priority to fix right now
		
		// if(this.direction == 'up')
		// {
			// if(this.pos.y <= this.origin.y - 10)
			// {
				// this.direction == 'down';
				// this.vel.y = 2;
			// }
			// else{this.vel.y = -2;}
		// }
		// else if (this.direction == 'down')
		// {
			// if(this.pos.y == this.origin.y)
			// {
				// this.direction == 'up';
				// this.vel.y = -2;
			// }
			// else{this.vel.y = 2;}
		// }
		
		
		this.parent();
	},
	
	check: function(other){
		
		this.kill();
		other.wearPajamas();
		ig.game.spawnEntity(EntitySparkleRing, ig.game.player.pos.x + ig.game.player.size.x/2, 
			ig.game.player.pos.y + ig.game.player.size.y/2, {});
	}
	
});
	
});

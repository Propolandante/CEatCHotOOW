ig.module(
	'game.entities.dustCloud'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityDustCloud = ig.Entity.extend({
	size: {x: 15, y: 15},
	
	maxVel: {x: 100, y: 100},
	
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet( 'media/dustCloud.png', 15, 15),
	
	health: 1,
	
	gravityFactor: 0,
	
	flipped: false,
	
	xSpeed: 0,
	ySpeed: 0,

	startY: 42069666, // junk values
	endY: 42069666, // junk values

	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		//if the SDB is flipped the hairball will be too
		this.vel.x = (settings.flipped ? -settings.xSpeed : settings.xSpeed);
		this.vel.y = settings.ySpeed;
		
		this.flipped = settings.flipped;
		
		this.addAnim( 'shooting', 1, [0] );
		
		ig.game.dustCloud = this;
	},
	
	
	update: function(){
		
		if(this.vel.x == 0)
		{
			this.kill();
		}
		if(this.vel.y == 0 && this.ySpeed != 0)
		{
			this.kill();
		}
		
		//if the SDB is flipped the hairball will be too
		this.vel.x = (this.flipped ? this.maxVel.x : -this.maxVel.x);
		
		
		
		this.parent();
		
	
	},
	
	check: function(other){
		
			this.kill();
			other.takeDamage(1);
			

	} 	
});
	
});

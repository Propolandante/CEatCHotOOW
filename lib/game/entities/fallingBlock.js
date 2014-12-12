ig.module(
	'game.entities.fallingBlock'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityFallingBlock = ig.Entity.extend({
	size: {x: 32, y: 32},
	collides: ig.Entity.COLLIDES.ACTIVE,
	gravityFactor: 0,
	maxVel: {x: 400, y: 800},
	animSheet: new ig.AnimationSheet( 'media/fallingBlock.png', 32, 32),
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	falling: false,
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		this.addAnim( 'block', 1, [0]);
		
	},
	
	check: function( other ){
		if (other instanceof EntityPlayer && ig.game.fatness === true){
			this.gravityFactor = 1;
			this.falling = true;
		}

		
	},

	update: function(){
		this.parent();
		if(this.falling && this.vel.y == 0)
			this.kill();
	},
	
});

});
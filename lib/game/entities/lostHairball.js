ig.module(
	'game.entities.lostHairball'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityLostHairball = ig.Entity.extend({
	size: {x: 12, y: 10},
	
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,

	animSheet: new ig.AnimationSheet( 'media/hairball1.png', 12, 10),
	
	
	gravityFactor: 1,
	


	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		//if the cat is flipped the hairball will be too
		this.vel.y = -200;
		
		
		this.addAnim( 'fall', 1, [0] );

	},
	
	
	update: function(){
		
		if(this.vel.y == 0)
		{
			this.kill();
		}
		
		
		this.parent();
		
	
	},
	
	check: function(other){
	} 	
});
	
});

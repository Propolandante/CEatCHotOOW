ig.module(
	'game.entities.beeFree'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityBeeFree = ig.Entity.extend({
	size: {x: 19, y: 14},
	
	name: 'beeFree',
	
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/beeSpriteSheet.png', 19, 14),
	
	maxVel: {x: 300, y: 300},
	
	o_y: -40,
	o_x: 10,
	f_y: -20,
	f_x: 40,
	
	ceiling: 100,
	
	gravityFactor: 0,
	
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'flying', 0.01, [0,1] );
			
		ig.game.beeFree = this;
	},
	
	
	update: function(){
		
		if(this.pos.y > this.ceiling)
		{
			this.vel.x = this.o_x;
			this.vel.y = this.o_y;
		}
		else
		{
			this.vel.x = this.f_x;
			this.vel.y = this.f_y;
		}
		
		if(this.pos.x > 650)
		{
			this.kill();
		}
		
		
		//make sure animation is flipped correctly
		if (this.flipped == true) {
				this.currentAnim.flip.x = true;
			} else {
				this.currentAnim.flip.x = false;
			}
		
		this.parent();
	},
	
	check: function(other){
		
		other.takeDamage(1);
	}
	
});
	
});

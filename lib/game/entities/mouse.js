ig.module(
	'game.entities.mouse'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityMouse = ig.Entity.extend({
	size: {x: 15, y: 11},
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/mouse2.png', 15, 11),
	
	health: 1,
	
	gravityFactor: 1,
	
	flipped: false,
	
	goingLeft: true, // set to 0 or 1 in Level Editor to change for a specific entity
	
	range: 64,
	xleft: 0,
	xright: 0,
	
	owner: -1,


	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'idle', 0.01, [0] );
		this.xleft = x -(this.range/2);
		this.xright = x + (this.range/2);
		
		//interpret initial direction (this is to avoid a directional change on the first frame!)
		if(this.goingLeft == true){this.vel.x = -30; this.flipped = false;}
		else if(this.goingLeft == false){this.vel.x = 30; this.flipped = true;}
		
		ig.game.mouse = this;
	},
	
	
	update: function(){
		
		// determine direction for this frame
		if(this.goingLeft == true)
		{ 
			if(this.vel.x == 0 || this.pos.x <= this.xleft) //if hits range edge or wall
			{
				this.goingLeft = false; // flip direction
			}
			
		}
		
		else if(this.goingLeft == false)
		{ 
			if(this.vel.x == 0 || this.pos.x >= this.xright) // if hits range edge or wall
			{
				this.goingLeft = true; // flip direction
			}
		}
		
		//interpret direction
		if(this.goingLeft == true){this.vel.x = -30; this.flipped = false;}
		else if(this.goingLeft == false){this.vel.x = 30; this.flipped = true;}
		
		//flip sprite if necessary
		if (this.flipped == true){
			this.currentAnim.flip.x = true;
		}else{
			this.currentAnim.flip.x = false;
		}
		
		this.parent();
	},
	
	check: function(other){
		
		if(ig.game.hairballs < other.capacity)
		{
			other.eatMouse();
			this.kill();
		}
	},
	
	takeDamage: function(val){
		//do nothing
	}
	
});
	
});

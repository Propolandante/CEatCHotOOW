ig.module(
	'game.entities.cursor'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityCursor = ig.Entity.extend({
	size: {x: 26, y: 16},
	offset: {x: 12, y: 34},
	//maxVel: {x: 400, y: 0},
	name: 'cursor',
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet( 'media/cat.png', 50, 50),
	
	startPos: 138,
	
	creditsPos: 210,
	
	optionsPos: 174,
	
	option: 1,
	//start = 1
	//options = 2
	//credits = 3
	
	//health: 1,
	
	//gravityFactor: 0,
	
	//flipped: false,

	//startY: 42069666, // junk values
	//endY: 42069666, // junk values

	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		//if the cat is flipped the hairball will be too
		//this.vel.x = (settings.flipped ? -this.maxVel.x : this.maxVel.x);
		
		//this.flipped = settings.flipped;
		
		this.addAnim( 'idle', 1, [0] );
		
		ig.game.cursor = this;
	},
	
	
	update: function(){
		if(ig.input.pressed('up') && this.pos.y >= this.startPos) //138
		{
			this.pos.y -= 36;
			this.option -= 1;
		} else if (ig.input.pressed('down') && this.pos.y <= this.startPos) {
			this.pos.y += 36;
			this.option += 1;
		}
		
		this.parent();
	},
	
	check: function(other){
		
			this.kill();
			other.kill();
			

	} 	
});
	
});
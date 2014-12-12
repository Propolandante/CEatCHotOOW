ig.module(
	'game.entities.tree'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityTree = ig.Entity.extend({
	size: {x: 16, y: 1},
	
	//offset: {x: 0, y: 1},
		
	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NONE,

	animSheet: new ig.AnimationSheet( 'media/tree_stacked.png', 16, 48),
	
	health: 1,

	water: 0,
	
	gravityFactor: 0,
	
	flipped: false,

	startY: 42069666, // junk values
	endY: 42069666, // junk values

	init: function (x,y,settings){
		this.parent(x,y,settings);
		
	},
	
	update: function(){
		
		if(this.vel.y == 0)
		{
			this.kill();
		}
		
		//if the cat is flipped the hairball will be too
		//this.vel.x = (this.flipped ? -this.maxVel.x : this.maxVel.x);

		this.parent();
	},

	draw: function(){

		ig.system.context.save();
            
        ig.system.context.rect(
            ig.system.getDrawPos(this.pos.x) - (this.screenOffset * ig.system.scale),
            ig.system.getDrawPos(this.pos.y) - (ig.game.screen.y * ig.system.scale),
            this.size.x * ig.system.scale,
            this.size.y * ig.system.scale
        );
        
        ig.system.context.clip();
        
        this.parent();
        
        ig.system.context.restore();
	},

	consumeWater: function(){

		//check if player is standing on the tree. if so, do not grow
		if (true)
		{
			this.water++;
		}
	},
});
	
});

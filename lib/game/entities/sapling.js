ig.module(
	'game.entities.sapling'
)
.requires(
	'impact.entity',
	'game.entities.tree'
)
.defines(function(){
	
EntitySapling = ig.Entity.extend({
	size: {x: 16, y: 16},
	
	//offset: {x: 0, y: 1},
		
	type: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.NONE,

	animSheet: new ig.AnimationSheet( 'media/tree_strip.png', 16, 16),
	
	health: 1,

	water: 0,

	targetWater: 150,
	
	gravityFactor: 0,
	
	flipped: false,

	startY: 42069666, // junk values
	endY: 42069666, // junk values

	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'tree', 1, [4] );

		console.log("tree spawned");

		//ig.game.spawnEntity(EntityTreeTop, this.pos.x - 16, this.pos.y - 16), {};

		
	},
	
	update: function(){

		if(this.water >= this.targetWater)
		{
			ig.game.spawnEntity(EntityTree, this.pos.x, (this.pos.y + this.size.y) - 48, 
			{water: this.water});

			this.kill();
		}
		
		this.parent();
	},

	// draw: function(){

	// 	ig.system.context.save();
            
 //        ig.system.context.rect(
 //            ig.system.getDrawPos(this.pos.x) - (this.screenOffset * ig.system.scale),
 //            ig.system.getDrawPos(this.pos.y) - (ig.game.screen.y * ig.system.scale),
 //            this.size.x * ig.system.scale,
 //            this.size.y * ig.system.scale
 //        );
        
 //        ig.system.context.clip();
        
 //        this.parent();
        
 //        ig.system.context.restore();
	// },

	consumeWater: function(){

		//check if player is standing on the tree. if so, do not grow
		if (true)
		{
			this.water++;
		}
	},
});
	
});

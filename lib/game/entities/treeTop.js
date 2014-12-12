ig.module(
	'game.entities.treeTop'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityTreeTop = ig.Entity.extend({
	size: {x: 56, y: 16},
	
	//offset: {x: 0, y: 1},
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.FIXED,

	animSheet: new ig.AnimationSheet( 'media/tree_strip.png', 48, 16),
	
	health: 1,
	gravityFactor: 0,

	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'treetop', 1, [0] );

		console.log("treetop " + this.pos.x + " " + this.pos.y);
		
	},
	
	update: function(){

		this.parent();
	}
});
	
});

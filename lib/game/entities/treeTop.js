ig.module(
	'game.entities.treeTop'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityTreeTop = ig.Entity.extend({
	size : {
			x : 294,
			y : 156
		},

	
	animSheet: new ig.AnimationSheet( 'media/treeTop.png', 294, 156),
	
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'tree', 1, [0] );

	},
	
	
	update: function(){
	},

	
	
});
	
});

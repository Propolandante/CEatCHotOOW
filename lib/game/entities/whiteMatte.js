ig.module(
	'game.entities.whiteMatte'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityWhiteMatte = ig.Entity.extend({
	size : {
			x : 608,
			y : 256
		},

	
	animSheet: new ig.AnimationSheet( 'media/whiteMatte.png', 608, 256),
	
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'matte', 1, [0] );

	},
	
	
	update: function(){
	},

	
	
});
	
});
